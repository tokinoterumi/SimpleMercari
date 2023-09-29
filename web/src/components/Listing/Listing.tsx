import React, { useState } from "react"
import Logo from "../Logo"

const server = process.env.REACT_APP_API_URL || "http://127.0.0.1:9000"

interface Prop {
  onListingCompleted?: () => void
}

type formDataType = {
  name: string
  category: string
  image: string | File
}

export const Listing: React.FC<Prop> = (props) => {
  const { onListingCompleted } = props
  const initialState = {
    name: "",
    category: "",
    image: "",
  }

  const [values, setValues] = useState<formDataType>(initialState)

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.files![0],
    })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData()
    data.append("name", values.name)
    data.append("category", values.category)
    data.append("image", values.image)

    fetch(server.concat("/items"), {
      method: "POST",
      mode: "cors",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Network error")
        }
      })
      .then((data) => {
        console.log("POST status:", data.message)
        onListingCompleted && onListingCompleted()
      })
      .catch((error) => {
        console.error("POST error:", error)
      })
  }

  return (
    <div className="Listing">
      <Logo />
      <form onSubmit={onSubmit}>
        <div className="form-container">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={onValueChange}
            required
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Category"
            onChange={onValueChange}
          />
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={onFileChange}
            required
            hidden
          />
          <label htmlFor="image">
            {" "}
            <svg
              fill="#000000"
              height="48px"
              width="28px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M502.667,74.667H12c-5.896,0-12,3.443-12,9.333v341.333c0,5.891,6.104,12,12,12h490.667c5.896,0,9.333-6.109,9.333-12V84 C512,78.109,508.562,74.667,502.667,74.667z M490.667,416H21.333V96h469.333V416z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M443.438,277.125c-5.26-2.635-11.667-0.5-14.313,4.771l-24.948,49.906l-74.875-84.224 c-2.094-2.365-4.865-3.635-8.323-3.573c-3.167,0.104-6.125,1.609-8.062,4.114l-64.615,83.078l-66.906-124.255 c-1.688-3.12-4.802-5.203-8.323-5.557c-3.604-0.385-7,1.063-9.271,3.787l-106.667,128c-3.771,4.526-3.156,11.25,1.365,15.021 c4.542,3.776,11.261,3.151,15.031-1.365l96.563-115.875l67.177,124.771c1.719,3.177,4.917,5.271,8.51,5.573 c3.552,0.297,7.094-1.234,9.302-4.083l66.802-85.875l76.813,86.417c2.031,2.292,4.948,3.578,7.969,3.578 c0.469,0,0.927-0.031,1.396-0.094c3.51-0.463,6.563-2.635,8.146-5.802l32-64C450.844,286.167,448.708,279.761,443.438,277.125z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M257.333,116c-23.531,0-42.667,19.141-42.667,42.667c0,23.526,19.135,42.667,42.667,42.667 c23.531,0,42.667-19.141,42.667-42.667C300,135.141,280.865,116,257.333,116z M257.333,180c-11.76,0-21.333-9.568-21.333-21.333 c0-11.766,9.573-21.333,21.333-21.333c11.761,0,21.333,9.568,21.333,21.333C278.667,170.432,269.094,180,257.333,180z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </label>
          <button type="submit">List an item</button>
        </div>
      </form>
    </div>
  )
}