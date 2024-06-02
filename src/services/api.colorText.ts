export const updateColorText = async (typeText: any, id: any, color: any) => {
  
      console.log("==== color new ==>", typeText, id,  color)
      const response = await fetch(
      `http://localhost:4000/title/update-color/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({typeText: typeText, id: id, color: color }),
      },
    )
  
    //console.log("==== color ==>", query, id, text, color)
  console.log("response new ==>", response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  
    const data = await response.json()
    console.log("Data API color ==>:", data)
    return data
  }