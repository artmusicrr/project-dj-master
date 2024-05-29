export const updateText = async (query: any, id: any, content: any) => {
  console.log("ID:", id)
  console.log("Conteúdo:", content)
  console.log("Query:", query)

  //const response = await fetch(`http://localhost:4000/title/${query}/${id}`, {

  const response = await fetch(
    `https://master-back-deploy.onrender.com/title/${query}/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    },
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  console.log("Data API==>:", data)
  return data
}
