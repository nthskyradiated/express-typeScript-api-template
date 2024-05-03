
declare global {
    declare namespace NodeJS {
        interface ProcessEnv {
            PORT: number
            NODE_ENV: 'dev' | 'prod'
            API_DIR_PATH: string
            MONGO_URI: string | undefined
        }
      
      }
}

  export {}