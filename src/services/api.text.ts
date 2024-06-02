export const updateText = async (query: any, id: any, text: any, color: any) => {
  
  //const response = await fetch(`http://localhost:4000/title/${query}/${id}`, {
    
    console.log("==== color ==>", query, id, text, color)
    const response = await fetch(
    `http://localhost:4000/title/${query}/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query: query, id: id, text: text, color: color }),
    },
  )

  //console.log("==== color ==>", query, id, text, color)
console.log("response ==>", response)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  console.log("Data API==>:", data)
  return data
}
