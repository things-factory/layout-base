export default function route(page) {
  switch (page) {
    case 'layout-base-main':
      import('./pages/main')
      return page
  }
}
