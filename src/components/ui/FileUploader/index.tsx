import React, { ChangeEvent } from 'react'
import api from '../../../interceptor/interceptor'

interface FileUploaderProps {
  onUploadSuccess: (data: any) => void
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append('image', file)
    })

    try {
      // Replace with your server endpoint
      const response = await api.uploadImage(formData)
      console.log('Upload successful:', response.data)
      onUploadSuccess(response.data.imageUrl) // Call the callback function with the response data
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  return (
    <div>
      <label>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}

export default FileUploader
