export interface Photo {
  id: string
  alt_description: string | null
  urls: {
    small: string
    regular: string
    full: string
  }
  user: {
    name: string
    profile_image?: {
      small: string
      medium: string
      large: string
    }
  }
} 