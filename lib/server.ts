import app from './app'
const PORT = 3000

app.listen(PORT, (): void => {
  console.log(`Express server listening on port ${PORT}`)
})
