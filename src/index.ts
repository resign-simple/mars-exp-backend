import express, {Request, Response} from 'express'

/**
 * * 셋팅 참조 링크
 * * https://velog.io/@qhgus/Node-Express-TypeScript-%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85
 */
const app = express()

app.get('/', (req: Request, res: Response) => {res.send('Hello World!')})

app.listen('3000', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 3000🛡️
  ################################################  
    `)
})