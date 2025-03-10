import React, { useState, useEffect } from "react"
import { Card, Form, Upload, Input, Button, message, List, Popconfirm, Modal, Table } from "antd"
import { UploadOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { uploadImageRequest, fetchGalleryRequest, deleteImageRequest } from "../../store/gallery/actions"
import { fetchContactsRequest } from "../../store/contact/actions"
import { RootState } from "../../store"
import { GalleryTypes } from "../../store/gallery/types"
import { useTheme } from "../../contexts/ThemeContext"
import "./styles.css"

const API_BASE_URL = process.env.REACT_APP_API_PROD
console.log("API_BASE_URL === galery component:", API_BASE_URL)


const GalleryManager: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([])
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()
  
  const { error, loading, images: galleryImages } = useSelector((state: RootState) => state.gallery.gallery)
  
  // Memoize the contacts selector
  const contacts = useSelector((state: RootState) => {
    const contactState = state.contact;
    return Array.isArray(contactState.contacts) ? contactState.contacts : [];
  });

  const { toggleTheme } = useTheme()
  const themeMode = useSelector((state: RootState) => state.theme.mode)

  useEffect(() => {
    dispatch(fetchGalleryRequest())
  }, [dispatch])

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("Por favor, selecione uma imagem")
      return
    }

    try {
      setUploading(true)
      
      const file = fileList[0]?.originFileObj
      if (!file || !(file instanceof File)) {
        throw new Error("Arquivo inválido")
      }

      dispatch(
        uploadImageRequest({
          image: file,
          description: description,
        })
      )

      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (error) {
        throw new Error(error)
      }

      message.success("Imagem enviada com sucesso!")
      setFileList([])
      setDescription("")
      
      dispatch(fetchGalleryRequest())
    } catch (err) {
      console.error('Erro no upload:', err)
      message.error(err instanceof Error ? err.message : "Erro ao enviar imagem")
    } finally {
      setUploading(false)
    }
  }

  const getImageUrl = (image: GalleryTypes | string): string => {
    if (!image) return '';
    if (typeof image === 'string') {
      return `${API_BASE_URL}${image}`;
    }
    return `${API_BASE_URL}${image.image_url || image.src || ''}`;
  }
  
  const getImageId = (image: GalleryTypes | string): string => {
    if (!image) return '';
    if (typeof image === 'string') {
      return image;
    }
    return image.id || image.id_image || '';
  }

  const handleDelete = async (image: GalleryTypes | string) => {
    try {
      const imageUrl = getImageUrl(image);
      const imageId = getImageId(image);
      
      setDeleting(imageId);
      
      const pathParts = imageUrl.split('/');
      const filename = pathParts[pathParts.length - 1];
      
      if (!filename) {
        throw new Error("Nome do arquivo não encontrado");
      }
      
      dispatch(deleteImageRequest({
        imageId: imageId,
        filename: filename
      }));
      
      message.success("Imagem deletada com sucesso!");
      
      setTimeout(() => {
        dispatch(fetchGalleryRequest());
      }, 500);
      
    } catch (err) {
      message.error("Erro ao deletar imagem");
    } finally {
      setDeleting(null);
    }
  }

  const uploadProps = {
    onRemove: () => {
      setFileList([])
    },
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('Você só pode fazer upload de imagens!')
        return false
      }
      
      setFileList([{
        originFileObj: file,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file),
      }])
      return false
    },
    fileList,
  }

  const showModal = () => {
    dispatch(fetchContactsRequest());
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Local do Evento',
      dataIndex: 'event_location',
      key: 'event_location',
    },
    {
      title: 'Data do Evento',
      dataIndex: 'event_date',
      key: 'event_date',
      render: (text: string) => text ? new Date(text).toLocaleDateString('pt-BR') : '-',
    },
    {
      title: 'Tipo de Evento',
      dataIndex: 'event_type',
      key: 'event_type',
    },
    {
      title: 'Mensagem',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  return (
    <Card 
      title="Gerenciamento da Galeria" 
      className="gallery-manager-card" 
      variant="outlined"
      style={{
        backgroundColor: 'var(--card-background)',
        color: 'var(--text-color)'
      }}
    >
      <Form layout="vertical">
        <Form.Item 
          label={<span style={{ color: 'var(--text-color)' }}>Enviar Nova Imagem</span>}
        >
          <Upload {...uploadProps} maxCount={1} accept="image/*">
            <Button 
              icon={<UploadOutlined />}
              style={{
                backgroundColor: 'var(--button-background)',
                color: 'var(--button-text)',
                borderColor: 'var(--border-color)'
              }}
            >
              Selecionar Imagem
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item 
          label={<span style={{ color: 'var(--text-color)' }}>Descrição da Imagem</span>}
        >
          <Input
            placeholder="Digite uma descrição para a imagem"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              backgroundColor: 'var(--input-background)',
              color: 'var(--input-text)',
              borderColor: 'var(--input-border)'
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0 || uploading}
            loading={uploading}
            style={{
              backgroundColor: 'var(--button-background)',
              color: 'var(--button-text)',
              borderColor: 'var(--border-color)'
            }}
          >
            {uploading ? 'Enviando...' : 'Enviar para Galeria'}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            icon={<FormOutlined />}
            onClick={showModal}
            style={{
              marginTop: '10px',
              backgroundColor: 'var(--button-background)',
              color: 'var(--button-text)',
              borderColor: 'var(--border-color)'
            }}
          >
            Ver Formulários de Contato
          </Button>
        </Form.Item>
      </Form>
      
      <div className="gallery-image-list">
        <h3>Imagens na Galeria</h3>
        
        {Array.isArray(galleryImages) && galleryImages.length > 0 ? (
          <List
            grid={{ 
              gutter: 8,
              xs: 2,
              sm: 3,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 4
            }}
            dataSource={galleryImages}
            renderItem={(image) => (
              <List.Item className="gallery-list-item">
                <div className="gallery-list-item-content">
                  <img 
                    src={getImageUrl(image)} 
                    alt="Gallery Thumbnail" 
                  />
                  <Popconfirm
                    title="Tem certeza que deseja excluir esta imagem?"
                    onConfirm={() => handleDelete(image)}
                    okText="Sim"
                    cancelText="Não"
                  >
                    <Button 
                      type="primary" 
                      danger
                      icon={<DeleteOutlined />} 
                      loading={deleting === getImageId(image)}
                      className="delete-button"
                    >
                      Excluir
                    </Button>
                  </Popconfirm>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <p style={{ color: 'var(--text-color)' }}>Nenhuma imagem na galeria.</p>
        )}
      </div>

      <Modal
        title="Formulários de Contato"
        open={isModalVisible}
        onCancel={handleModalCancel}
        width={1200}
        footer={null}
      >
        <Table
          dataSource={contacts}
          columns={columns}
          scroll={{ x: true }}
          rowKey="id"
          locale={{
            emptyText: 'Nenhum contato encontrado'
          }}
        />
      </Modal>
    </Card>
  )
}

export default GalleryManager