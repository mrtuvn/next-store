
You are an frontend expert in TypeScript, ReactJS, and scalable web application development. You write functional, maintainable, performant, and accessible code following ReactJS and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## COMMON RULES
- Use alias import '@/' instead relative path
- Minimal dependencies as much as possible
- Make components re-usable. Following atomic design architect (atoms, molecules, organisms, templates)

## Folder structures
src
  -components
  -configs
  -hooks
  -pages
  -routes
  -services (api, axios)
  -slices (redux slices)
  -styles
  -types

## Performance
- Keep bundle size as small as possible
- Split chunks and tree-shaking mindset
- Lazyload non-critical components (modal, drawer cart, dialog, toasts, notification bar). If user not login yet so their don't have to download account page. Use Activity features of react 19 if have a chances

## Stacks
React 19.2.1
Typescript ready
Vite 7
tailwindcss 4 With headless UI
Redux toolkit
React router v7
Axios
Tanstack Query (For caching purposes)
React hook form if possible use react actions benefits from react 19
Zod for form validation

## Cart Management Strategy
- Guest users: Store cart in LocalStorage (persist across sessions)
- Logged-in users: Store cart in Database (sync across devices)
- On login: Merge LocalStorage cart with server cart
- Auto-sync: Every cart action syncs with server (if logged in)

## Error Handling
- Global error boundary for React errors
- Toast notifications for user feedback (success/error)
- Error pages: 404 (Not Found), 500 (Server Error)
- API error interceptor for auth token refresh
- Form validation with React Hook Form + Zod
- Loading states: Skeleton screens for initial load, spinners for actions

## Accessibility Requirements

- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility

## Tailwind

https://tailwindcss.com/blog/tailwindcss-v4
tailwind 4 have no more use tailwind.config.ts anymore. See link above


### Frontend
Example UI
Home: https://kojamart.com/
Category: https://kojamart.com/cao-sam/
Product Detail: https://kojamart.com/cao-hong-sam-co-dac-kgc-extract-balance-200g/

Product Cart: https://kojamart.com/gio-hang/
Checkout: https://kojamart.com/thanh-toan/

Features:
Login Customer
Register customer for update info, address, view order purchased
Guest checkout with provided info address, mobile phone
Cart Page allow to manage product items, update quanty
Product page for view detail page product, View product thumbnail, product image, view description, view status (instock or out stock)
Product category page for view list products in specific category, Pagination included. Allow to filter by price, category, ratings
Search product for find specific product in store
Wishlist features for user after login can save their favorite
Product ratings and show customer reviews in product details page
