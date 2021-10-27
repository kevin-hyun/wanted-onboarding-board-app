<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

- 프레임워크: [NestJS](https://github.com/nestjs/nest) 
  - 사용이유 : 기존에 JS기반에 Express 프레임워크를 다루면서 구조가 없어서 불편함을 겪어본 적이 있음. Typescript가 제공하는 안정성과 NestJS가 제공하는 아키텍쳐와 객체지향적 프로그래밍의 특성을 살린 백엔드 서버를 구축해보고 싶은 경험으로 구현
- 데이터베이스 : [SQLite](https://github.com/sqlite/sqlite)
  - 사용이유 : In memory database 중에서 메모리와 파일 두가지 동시에 저장이 되고 별도의 설치 없이 파일만 있으면 DB자료를 CRUD할 수 있어서 사용  

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## ENDPOINT && API Documentation 

- Swagger API Documentation 이용
- http://localhost:3000/swagger/api/ 

  ![Screen Shot 2021-10-27 at 2 36 49 AM](https://user-images.githubusercontent.com/78840341/138978188-3a3013ca-d16e-4ca6-a697-63d4138045ef.png)




### AUTH (회원가입/인증)



- 회원가입 : **POST :  localhost:3000/signup**
  - {`username`,`password`} 입력하여 회원가입  


  ![Screen Shot 2021-10-27 at 2 41 22 AM](https://user-images.githubusercontent.com/78840341/138978321-230f1cae-0efe-4fd5-80e2-22dce7186b62.png)


- 인증 : **POST : localhost:3000/signin**
  - {`username`,`password`} 입력하여 로그인 
  - 로그인 성공시 `accessToken` 발급 
	   ![Screen Shot 2021-10-27 at 2 40 23 AM](https://user-images.githubusercontent.com/78840341/138978267-6c48f692-fd2c-4698-9807-b5b58f55dd07.png)

  - 발급된 `accessToken` 을 Board CRUD에서 참고할 수 있도록  `Authorization`에 입력
  ![Screen Shot 2021-10-27 at 2 42 13 AM](https://user-images.githubusercontent.com/78840341/138979532-2bc1146b-2a33-48ef-841f-ac60dbcbf78d.png)



### BOARD (게시판 CRUD)

- Auth bearerToken이 API를 실행하기 전에 Custom decorator로 실행
  ![Screen Shot 2021-10-27 at 2 42 50 AM](https://user-images.githubusercontent.com/78840341/138979561-a263a60b-054c-48dc-b757-e5b708fa91c0.png)

- 게시글 작성 :  **POST :  localhost:3000/boards**
    - {`title`: 게시글 제목 , `description` : 게시글 내용} 을 입력하여 진행 
    - `status`: 게시글 공개여부 는 default로  `PUBLIC`으로 지정

  ![Screen Shot 2021-10-27 at 2 43 53 AM](https://user-images.githubusercontent.com/78840341/138979580-ba125293-145c-4c07-8b5e-c32961fd8aac.png)  

- 특정 게시글 조회  : **GET :  localhost:3000/boards/{id}**
    - 조회하고자 하는 게시글의 id를 parmaeter로 받아 조회 
    - 해당 유저가 해당 게시글의 id를 가지고 있지않으면 404 에러 반환

  ![Screen Shot 2021-10-27 at 2 44 34 AM](https://user-images.githubusercontent.com/78840341/138979612-a0a7553e-021b-458e-a012-613367ebce56.png)


- 특정 게시글 변경  : **PUT :  localhost:3000/boards/{id}**
    - 변경하고자 하는 게시글의 id를 parmaeter로 받아 조회 
    - 변경하려고 하는 내용을 담아 덮어쓰기 방식(PUT)으로 진행
    - 해당 유저가 해당 게시글의 id를 가지고 있지않으면 404 에러 반환
  ![Screen Shot 2021-10-27 at 2 45 00 AM](https://user-images.githubusercontent.com/78840341/138979660-1cad0895-cd22-4565-aa0a-fde8b709a284.png)


- 특정 게시글 삭제  : **DELETE :  localhost:3000/boards/{id}**  
    - 삭제하고자 하는 게시글의 id를 parmaeter로 받아 조회 
    - 해당 유저가 해당 게시글의 id를 가지고 있지않으면 404 에러 반환

  ![Screen Shot 2021-10-27 at 2 57 52 AM](https://user-images.githubusercontent.com/78840341/138979760-a874ef59-2a1d-4d64-9634-61c96ebcdf5a.png)

- 모든 게시글 조회 : **GET :  localhost:3000/boards?page=1&limit=10**
    - Pagination이 적용이 되어 페이지와 한 페이지의 보여질 숫자를 지정하면 이에 맞춰서 조회

  ![Screen Shot 2021-10-27 at 2 45 15 AM](https://user-images.githubusercontent.com/78840341/138979682-ace145e0-b263-4550-8ed3-63dbb6c6b2ff.png)

    ![Screen Shot 2021-10-27 at 2 45 38 AM](https://user-images.githubusercontent.com/78840341/138979712-8d483ce3-0dcc-4b0f-b620-746ca27d73e1.png)
  ![Screen Shot 2021-10-27 at 2 45 50 AM](https://user-images.githubusercontent.com/78840341/138979723-10f9ad71-cace-4178-80bb-a1cdb2540026.png)

    ![Screen Shot 2021-10-27 at 2 46 09 AM](https://user-images.githubusercontent.com/78840341/138979732-ffb1c0c1-ed7b-4dd9-bb09-e75f8c5f81c5.png)

----------------------------------

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
