import * as CatalogService from 'src/services/admin/CatalogService'

export function setCatalogs (context, payload) {
  CatalogService.index(payload).then((catalogs) => {
    context.commit('setCatalogs', catalogs)
  }).catch(() => {
  })
}
