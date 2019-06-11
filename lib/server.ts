import app from './app'
const PORT = process.env.PORT || 3000

app.listen(PORT, (): void => {
  console.log(`Express server listening on port ${PORT}`)
})
