export const FormValidation = {
  addGame: {
    name: { required: true },
    publisher: { required: true },
    slug: { required: "At least 2 characters", minLength: 2 },
    released: { required: true, minLength: 6 },
    rating: { required: "Value must be in range 1 and 5", min: 1, max: 5 },
    metacritic: { required: "Value must be in range 0 and 100", min: 0, max: 100 },
    genres: { required: 'At least one option required!' },
    platforms: { required: 'At least one option required!' },
    description: { required: 'Required characters range is 50-700!', minLength: 50, maxLength: 700 },
    background_image: { pattern: { value: new RegExp ('^(https?://)'), message: 'Value must be a URL' }, required: true },
    clip: { pattern: { value: new RegExp ('^(https?://)'), message: 'Value must be a URL' }, required: false },
    screenshots: { pattern: { value: new RegExp ('^(https?://)'), message: 'Value must be a URL' }, required: false }
  },
  editGame: {
    name: { required: true },
    publisher: { required: true },
    slug: { required: "At least 2 characters", minLength: 2 },
    released: { required: true, minLength: 6 },
    rating: { required: "Value must be in range 1 and 5", min: 1, max: 5 },
    metacritic: { required: "Value must be in range 0 and 100", min: 0, max: 100 },
    genres: { required: 'At least one option required!' },
    platforms: { required: 'At least one option required!' },
    description: { required: 'Required characters range is 50-700!', minLength: 50, maxLength: 700 },
    background_image: { pattern: { value: new RegExp ('^(https?://)'), message: 'Value must be a URL' }, required: true },
    clip: { pattern: { value: new RegExp ('^(https?://)'), message: 'Value must be a URL' }, required: false },
    screenshots: { pattern: { value: new RegExp ('^(https?://)'), message: 'Value must be a URL' }, required: false }
  }
};

export const FormInitialValues = {
  addGame: {
    name: '',
    slug: '',  
    background_image: '',
    description: '',
    released: '',
    rating: 0,
    metacritic: 0,
    clip: '',
    publisher: '',
    genres: [],
    platforms: [],
    short_screenshots: []
  },
  editGame: {
    name: '',
    slug: '',  
    background_image: '',
    description: '',
    released: '',
    rating: 0,
    metacritic: 0,
    clip: '',
    publisher: '',
    genres: [],
    platforms: [],
    short_screenshots: []
  }  
};