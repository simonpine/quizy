import { useState } from "react";
export function useImageShowInput() {
    const [imageUrl, setImage] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    return {imageUrl, onImageChange }
}