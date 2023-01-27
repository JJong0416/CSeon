# 🧑🏻‍🏫C;Seon (CS 선생님)

### *우리들의 CS 선생님 **C;Seon** (22.10 ~ 22.11)*

**Github :** [**https://github.com/JJong0416/CSeon**](https://github.com/JJong0416/CSeon)

**Server :~~[https://k7a606.p.ssafy.io/](https://k7a606.p.ssafy.io/)(서버 종료)~~**

**Notion :** [https://www.notion.so/jjongdev/Cseon-efdd125ecfab4dbda520c40a517135aa](https://www.notion.so/C-seon-3c96cf392ea442e2945de1320bcb80b1)

### 프로젝트 간략 소개

 **C;Seon**이란, 취업에 있어서 필요한 기술 지식 및 CS지식을 학습할 수 있는 **웹 어플리케이션 플랫폼**입니다. 

다양한 카테고리 별 문제 풀이를 통해 필요한 지식을 습득할 수 있으며, 자신의 약점을 보완하기 위한 자체 문제집 제작이 가능합니다. 마이페이지에서 맞은 문제와 틀린 문제를 확인할 수 있으며, 풀이 로그를 통해 공부한 날짜와 시간을 확인할 수 있습니다. 또한, **실시간 대회**를 통해 다른 유저들과 CS 지식을 겨룰 수 있습니다. 실시간으로 자신의 점수와 순위가 바뀌는 것을 보며, 사용자에게 경쟁심과 즐거움을 제공할 수 있도록 하였습니다. 

## System Architecture
![image](https://user-images.githubusercontent.com/73544708/214032865-4df190f1-8931-4e77-a390-d9e0dc9a05a4.png)

## ERD(Entity Relationship Diagram)
![image](https://user-images.githubusercontent.com/73544708/214033023-6b857e02-8990-44d2-b5aa-d62402056a5c.png)

## MongoDB Data Modeling
![image](https://user-images.githubusercontent.com/73544708/214033138-a7b6d5d9-aa50-4482-8f1b-d5a66cb82a97.png)

## Stack
![image](https://user-images.githubusercontent.com/73544708/214033245-31581809-be1b-420d-a78e-1484c584b546.png)

## Project Core Features

1. In-memory DB인 **Redis를 활용한 실시간 대회 시스템 구축**
2. 사용자들의 오답 로그를 위해 **Document의 형식을 저장할 수 있는 MongoDB 사용**
3. 사용자의 데이터를 보호하고 유실되는 것을 방지하기 위해서 **Kafka 도입**

# `설계와 기술 적용에 있어서 고민을 한 부분🤔`

### 1. In-Memory Database 중 어떤 기술을 적용할 것인가에 대한 고민
![image](https://user-images.githubusercontent.com/73544708/215025659-3b996b79-e10a-4414-9ed6-e056638b4d01.png)

- 랭킹에 대한 정보를 RDBMS로 하게 된다면는 상대적으로 더 많은 리소스가 소비되기 때문에, 메모리 영역에서의 미들웨어인 **In-memory Database를 사용**하기로 결정했습니다.
- 대표적으로 Redis와 Memcached가 있는데, **각각의 기술에 대한 특징과 Development Side**를 중점적으로 비교했으며, 결과적으로 **Redis를 적용**하기로 했습니다.
- Redis는 **다양한 자료구조를 지원**해주고 있기 때문에, **개발자가 구현 난이도를 낮출 수 있다는 장점**이 있습니다.

### 2. 실시간 랭킹과 문제 진행도를 위한 Redis Data Structure
![image](https://user-images.githubusercontent.com/73544708/214033685-0bed5012-5af7-4dd8-8353-f5047694a8b1.png)

- 대회 랭킹을 꺼내올 때 마다 정렬을 하는 것은 리소스 낭비라고 판단하였습니다.
- Redis는 **Sorted Set**을 제공해주고 있기 때문에, 이를 활용하여 데이터가 들어올 때 마다 정렬되어 들어올 수 있도록 하였습니다.
    - Sorted Set에서는 Key 값은 대회번호이며, Member는 유저의 아이디, Score는 현재 점수를 의미합니다.
- 문제 진행도를 위해 **Hahses**을 이용하며, 현재 대회에서의 유저들의 실시간으로 변동되는 정보도 저장할 수 있도록 하였습니다.

### 3. 대회가 아닌 일반 문제집 오답을 위한 MongoDB Data Modeling
![image](https://user-images.githubusercontent.com/73544708/214034140-bf0dd7dc-3211-47ec-acaf-ec90b43688a4.png)

- 시선(C;Seon)은 **사용자들의 맞고 틀린 문제들을 제공하고 있어야 할 뿐만 아니라, 해당 문제를 어떻게 풀었는지에 대한 정보**도 가지고 있어야 합니다.
- **User Document**는 해당 유저가 어떤 문제를 맞았고, 어떤 문제를 틀렸는지에 대한 정보가 배열로 들어가 있고, 해당 유저가 발생시킨 로그들을 가지고 있습니다.
- **Log Document**는 문제를 푼 유저들이 발생시키는 로그를 담은 도큐먼트입니다.
    - 시간, 문제 번호, 해당 유저가 선택한 번호, 그리고 해당 문제를 맞았는지 틀렸는지에 대한 정보가 들어있습니다

# `프로젝트를 진행하며 이슈발생과 처리과정😊`

### 1. 실시간 대회에서 클라이언트가 비정상 종료에 대한 대처
![image](https://user-images.githubusercontent.com/73544708/214034273-358adbed-a16f-407b-b33b-6a7cd0045f26.png)

- 대회에 참여한 사람들은 대회를 진행하면서 API를 보내게 되고, **서버에서는 해당 API를 통해 Redis에 접근**합니다.
- 문제는 클라이언트 서버가 중간에 끊기게 되었을 때, ‘**어떻게 하면 형평성 있게 서비스를 유지할 것**이냐’ 입니다.
    - 개별적인 네트워크 상황으로 인해 서버를 나간 클라이언트의 재접속을 막는 것은 불합리하다고 판단했습니다.
    - 하지만, 다시 문제를 풀 수 있도록 하는 것은 점수 조작에 대한 가능성을 열어두는 것이기 때문에 형평성에 어긋난다고 판단했습니다.
- 해당 문제를 해결하기 위해 **Redis의 Key-Value 형식의 해시 테이블을 만들어서 사용자의 접근 범위를 제한할 수 있도록** 하였습니다.
![image](https://user-images.githubusercontent.com/73544708/214034333-a495088c-b7be-4a14-a335-9208e5d1c72c.png)

- Collection Id는 Contest Id로 설정을 하였고, Key는 유저의 닉네임, **Index는 마지막으로 푼 문제 대한 정보를 저장**했습니다. 이를 통해, 재접속한 유저는 마지막으로 푼 문제 이후의 문제에만 접근 가능하도록 하였습니다.

### 2. 시간에 따른 랭킹 순위 변동 알고리즘
![image](https://user-images.githubusercontent.com/73544708/214034383-215febdf-e208-4817-86c8-9c04ac620ca2.png)

- 실시간 랭킹을 구현하면서, 순위에 대한 기준을 세울 필요가 있다고 판단했습니다.
    - 같은 점수라면 유저의 닉네임(Redis Key)값으로 순위가 바뀌게 되는데, 이는 불합리한 순위 선정을 야기합니다.
    - 이를 해결하기 위하여 저희는 **대회의 전체 점수로 높은 순으로 정렬**하되 **전체 점수가 같을 경우 시간이 많이 남은 순**으로 정렬하는 새로운 점수 산정 방식을 도입하였습니다.
        
        ![image](https://user-images.githubusercontent.com/73544708/214034427-dced6948-fe6b-4bb0-b632-9cc6905a3b77.png)
        
- Redis에서 **SortedSet의 Score는 Double 타입이므로, 정수 부분은 맞은 개수로 소수 부분은 남은 시간으로 설정한 점수 시스템을 적용한다면, 추가적인 자료구조를 사용하지 않고 쉽게 랭킹을 구할 수 있을 것이라고 판단**했습니다.
    - 이를 통해 추가적인 Redis Collection 없이, 하나의 **Redis 자료구조만을 활용**하여 **메모리를 절약**할 수 있었습니다.

### 3. MongoDB 보안 이슈

![image](https://user-images.githubusercontent.com/73544708/214034761-5af07c71-aa2d-44fb-bed1-cdf54a46f971.png)

- 프로젝트를 진행하면서, 편의를 위해 잠시 MongoDB server의 접근 권한을 열어둔 적이 있습니다.
- 해당 기간에 MongoDB Database Set이 해킹 당하는 일이 있었고, 프로젝트의 모든 Data가 사라졌습니다. 이를 통해 보안의 필요성을 알게 되었고, 사용자 역할 별로 DB 접근 권한을 부여하여 보안을 강화하였습니다.

![image](https://user-images.githubusercontent.com/73544708/214034789-8020d7d0-bdef-4e72-b277-a4978a6f7294.png)

# `회고😉`

### 1. MongoDB **Multi Key Index**를 통한 빠른 검색

![image](https://user-images.githubusercontent.com/73544708/214034819-c98caf9f-1832-445b-a67d-cd92b0a2e3e7.png)

- 해당 모델링의 장점 중 하나는 해당 유저가 풀었던 모든 문제들의 기록을 단번에 조회할 수 있다는 것입니다.
- 그렇지만 역으로, 해당 문제를 틀렸던 유저들을 모두 조회하게 된다면 결국은 모든 유저들을 조회하는 수 밖에 없다.
- MongoDB는 Multi Key Index를 제공하고 있기 때문에 **(UserId, ProblemId)의 복합키를 통해서 추가적인 인덱스를 제공**할 수 있습니다.
    - 이렇게 인덱스를 생성함으로써, 로그의 검색 속도를 높힐 수 있습니다.
- 만약 해당 도메인에 위와 같은 요구사항이 생긴다면, **Multi Key Index를 생각해보는 것도 좋을 것** 같습니다.

### 2. Redis 서버가 다운되었을 때, 복구 로직 미구현

- 현재 Redis 서버에 대회에 정보(대회 랭킹, 유저 인덱스)들이 같이 구현되어 있습니다. 그렇지만 **만약 서버가 죽게 된다면, 해당 대회에 대한 기록들이 모두 다  휘발**됩니다.
- 그렇기 때문에 크게 두가지 방식으로 생각해 볼 수 있는데, **하나는 AOF 또는 RDB로 데이터를 복구하는 방식**이 있을 것 같습니다.
    - RDB 방식은 결국엔 스냅샷을 찍어서, 영속화 하는 방식이기 때문에 잘 사용하지 않습니다.
    - 그렇기 때문에, 보통은 AOF와 RDB를 적절하게 혼합하여 사용하거나, AOF만 사용합니다.
- 또 다른 하나는, **랭킹 시스템 자체는 Redis에서 하고 유저들의 Index는 Redis가 아닌 다른 NoSQL을 사용하는 것 또한 좋은 방법 중 하나**일 것 같습니다.
