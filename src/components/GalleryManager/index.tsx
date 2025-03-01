import React, { useState } from "react"
import { Card, Form, Upload, Input, Button, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { uploadImageRequest } from "../../store/gallery/actions"
import { RootState } from "../../store"
import "./styles.css"

const GalleryManager: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([])
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()
  
  // Monitorando o estado de erro da galeria
  const { error, loading } = useSelector((state: RootState) => state.gallery.gallery)

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("Por favor, selecione uma imagem")
      return
    }

    try {
      setUploading(true)
      
      // Garantindo que temos um arquivo válido
      const file = fileList[0]?.originFileObj
      if (!file || !(file instanceof File)) {
        throw new Error("Arquivo inválido")
      }

      console.log('Preparando para enviar arquivo:', {
        name: file.name,
        size: file.size,
        type: file.type
      })

      dispatch(
        uploadImageRequest({
          image: file,
          description: description,
        })
      )

      // Aguardando um pequeno delay para verificar se houve erro
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (error) {
        throw new Error(error)
      }

      message.success("Imagem enviada com sucesso!")
      setFileList([])
      setDescription("")
    } catch (err) {
      console.error('Erro no upload:', err)
      message.error(err instanceof Error ? err.message : "Erro ao enviar imagem")
    } finally {
      setUploading(false)
    }
  }

  const uploadProps = {
    onRemove: () => {
      setFileList([])
    },
    beforeUpload: (file: File) => {
      // Validando o tipo do arquivo
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('Você só pode fazer upload de imagens!')
        return false
      }
      
      console.log('Arquivo selecionado:', {
        name: file.name,
        size: file.size,
        type: file.type
      })
      
      setFileList([{
        originFileObj: file,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file),
      }])
      return false // Prevent upload
    },
    fileList,
  }

  return (
    <Card title="Gerenciamento da Galeria" className="gallery-manager-card">
      <Form layout="vertical">
        <Form.Item label="Enviar Nova Imagem">
          <Upload {...uploadProps} maxCount={1} accept="image/*">
            <Button icon={<UploadOutlined />}>Selecionar Imagem</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Descrição da Imagem">
          <Input
            placeholder="Digite uma descrição para a imagem"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0 || uploading}
            loading={uploading}
          >
            {uploading ? 'Enviando...' : 'Enviar para Galeria'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default GalleryManager