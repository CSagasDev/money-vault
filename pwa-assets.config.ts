import {
  defineConfig,
  minimal2023Preset,
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    ...minimal2023Preset,
    maskable: {
      ...minimal2023Preset.maskable,
      resizeOptions: { fit: 'contain', background: '#242424' },
    },
    apple: {
      ...minimal2023Preset.apple,
      resizeOptions: { fit: 'contain', background: '#242424' },
    },
  },
  images: ['public/logo.svg'],
})
