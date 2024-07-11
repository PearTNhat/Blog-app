import { getAllPostCategories } from '~/services/postCategories'

const categoriesToOptions = (categories) => ({ value: categories._id, label: categories.title })
const filterCategories = (initialValue, categories) => {
  const item = categories.map(categoriesToOptions).filter((item) => {
    return item.label.toLowerCase().includes(initialValue.toLowerCase())
  })
  return item
}
const promiseOptionsCategories = async (initialValue) => {
  const { data: categories } = await getAllPostCategories({ limit: 20 })
  return filterCategories(initialValue, categories)
}
export { categoriesToOptions, filterCategories, promiseOptionsCategories }
