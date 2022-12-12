# 🧑🏻‍🏫C;Seon (CS 선생님)

---

### *우리들의 CS 선생님 **C;Seon** (22.10 ~ 22.11)*

**Github :** [**https://github.com/JJong0416/CSeon**](https://github.com/JJong0416/CSeon)

**Server :** [**https://k7a606.p.ssafy.io/**](https://k7a606.p.ssafy.io/)

**Notion :** [https://www.notion.so/jjongdev/Cseon-efdd125ecfab4dbda520c40a517135aa](https://www.notion.so/Cseon-efdd125ecfab4dbda520c40a517135aa)

### 프로젝트 간략 소개

 **C;Seon**이란, 취업에 있어서 필요한 기술 지식 및 CS지식을 학습할 수 있는 **웹 어플리케이션 플랫폼**입니다. 

다양한 카테고리 별 문제 풀이를 통해 필요한 지식을 습득할 수 있으며, 자신의 약점을 보완하기 위한 자체 문제집 제작이 가능합니다. 마이페이지에서 맞은 문제와 틀린 문제를 확인할 수 있으며, 풀이 로그를 통해 공부한 날짜와 시간을 확인할 수 있습니다. 또한, **실시간 대회**를 통해 다른 유저들과 CS 지식을 겨룰 수 있습니다. 실시간으로 자신의 점수와 순위가 바뀌는 것을 보며, 사용자에게 경쟁심과 즐거움을 제공할 수 있도록 하였습니다. 

## System A**rchitecture**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d36d1917-86a3-4568-947c-0a31d481b7d8/Untitled.png)

## ERD(Entity Relationship Diagram)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/740405e1-086d-426c-9654-7782a022838e/Untitled.png)

## Stack

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/439f80d3-6550-4495-ae4b-bfd6b788ed75/Untitled.png)

## Project C**ore Features**

1. In-memory DB인 **Redis를 활용한 실시간 대회 시스템 구축**
2. 사용자들의 오답 로그를 위해 **Document의 형식을 저장할 수 있는 MongoDB 사용**
3. 사용자의 데이터를 보호하고 유실되는 것을 방지하기 위해서 **Kafka 도입**

# `설계와 기술 적용에 있어서 고민을 한 부분🤔`

### 1. Local Cache가 아닌 Redis 서버를 도입한 이유

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2dec1c48-89a3-425c-aa1e-88a8ff54a9f4/Untitled.png)

- **단일 서버라면 Local Cache를 사용하는 것이 효율적**일 것입니다.
- 하지만 서버의 확장성을 고려했을 때,  Local Cache를 사용하면 **일관성이 깨질 수 있다**는 문제점이 있습니다.
    - Nginx의 Load Balancing으로 인해 요청이 어느 서버로 갈 지 알 수 없어, 한 클라이언트가 무조건 동일한 서버로만 간다고 보장할 수 없기 때문입니다.
- 뿐만 아니라, Redis를 클러스터링(Clustering)하는 부분도 고려하고 있었기에, **확장성**을 위해서 서버를 따로 두는 것이 효과적이라고 판단하였습니다.

### 2.  Disk DB vs In-memory DB 와 Redis vs Memcached

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37948ff2-cab7-4715-9f0d-a7ec5dcfe1cb/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f8cee27-22b6-4920-9924-5126b76c14ca/Untitled.png)

- 우리가 일반적으로 사용하는 RDBMS(Disk DB)는 디스크 영역에서의 미들웨어입니다. **디스크 같은 경우 가격이 싸고 용량이 크긴 하지만, 속도가 상대적으로 느리다는 단점**이 있습니다.
- 무엇보다 속도가 중요한 실시간 대회를 성공적으로 서비스하기 위하여, **디스크와 다르게 상대적으로 빠른 메모리(In-memory DB)를 사용하는 것이 좋다고 판단**하였습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03aa55d7-5608-4c30-8ebd-714d8d8a3f7d/Untitled.png)

- In-memory DB는 대표적으로 Redis와 Memcached가 있습니다.
- **Redis**는 ****Memcached보다 **성능적으로 우수**할 뿐더러, **다양한 자료구조를 지원**해주고 있기 때문에, 개발자가 구현 난이도를 낮출 수 있다는 장점이 있습니다.
- 또, **AOF, RDB와 같은 백업 시스템**과 **클러스터링**을 쉽게 할 수 있어 **안정적인 서비스**를 구현할 수 있었습니다.

### 3. 사용자들의 풀이를 기록하기 위해 MongoDB 도입

- 사용자들의 풀이 로그는 **다양한 타입으로 들어오기 때문에 데이터 타입을 유연하게 핸들링** 할 수 있어야 합니다.
- RDBMS는 엄격한 스키마를 가지고 있기도 하고 말 그대로 관계형에 특화되어 있는 DB이기 때문에, schema-free인 Document 형식의 MongoDB를 선택하였습니다.
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/213b47a5-aa37-43a9-b080-02d05032623b/Untitled.png)
    
- 또한 위 사진처럼 MySQL과 MongoDB 성능을 비교했을 때, 둘 다 쓰기 성능은 비슷하지만 MongoDB가 읽기 성능이 **3배** 이상 빠르기 때문에 더욱 **신속한 서비스를 제공**할 수 있었습니다.

### 4. 데이터를 보호하기 위해 Kafka를 선택한 이유

- 어느 경우든 시스템의 장애는 불가피하게 발생할 수 있습니다. 특히 실시간 대회의 경우에는 **데이터의 중요도**가 더 높아집니다.
- **Message Queue**를 도입함으로써 서버가 다운되더라도 외부에 존재하는 Message Queue에는 데이터가 보존되어 있으므로 **데이터의 지속성**을 유지할 수 있습니다.
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bc7776f3-f802-4509-945d-c711f02acde2/Untitled.png)
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/18347232-3004-40f6-b31c-35ad487439b4/Untitled.png)
    
- Message Queue에는 여러 미들웨어가 존재하지만, **Kafka**의 경우 **Produce**와 **Consume** 모두 타 Message Queue보다 빠른 속도를 보여 실시간 대회에 적합하다고 판단하였습니다.

# `프로젝트를 진행하며 이슈발생과 처리과정😊`

### 1. 실시간 대회에서 클라이언트가 비정상 종료에 대한 대처

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/04917d50-7fab-4554-8292-2d0e4e959227/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4eb08d82-3866-46d9-b1a0-c31049e3ec53/Untitled.png)

- 대회에 참여한 사람들은 대회를 진행하면서 API를 보내게 되고, **서버에서는 해당 API를 통해 Redis에 접근**합니다.
- 문제는 클라이언트 서버가 중간에 끊기게 되었을 때, ‘**어떻게 하면 형평성 있게 서비스를 유지할 것**이냐’ 입니다.
    - 개별적인 네트워크 상황으로 인해 서버를 나간 클라이언트의 재접속을 막는 것은 불합리하다고 판단했습니다.
    - 하지만, 다시 문제를 풀 수 있도록 하는 것은 점수 조작에 대한 가능성을 열어두는 것이기 때문에 형평성에 어긋난다고 판단했습니다.
- 해당 문제를 해결하기 위해 **Redis의 Key-Value 형식의 해시 테이블을 만들어서 사용자의 접근 범위를 제한할 수 있도록** 하였습니다.
    - Collection Id는 Contest Id로 설정을 하였고, Key는 닉네임, Index는 마지막으로 푼 문제 대한 정보를 저장했습니다. 이를 통해, 재접속한 유저는 마지막으로 푼 문제 이후의 문제에만 접근 가능하도록 하였습니다.

### 2. 시간에 따른 랭킹 순위 변동 알고리즘

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/36498b1e-51fd-4d0e-a13f-7f85d1f940e4/Untitled.png)

- 실시간 랭킹을 구현하면서, 순위에 대한 기준을 세울 필요가 있다고 판단했습니다.
    - 같은 점수라면 유저의 닉네임(Redis Key)값으로 순위가 바뀌게 되는데, 이는 불합리한 순위 선정을 야기합니다.
    - 이를 해결하기 위하여 저희는 **맞은 개수가 높은 순으로 정렬**하되 **맞은 개수가 같을 경우 시간이 많이 남은 순**으로 정렬하는 새로운 점수 산정 방식을 도입하였습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37d05272-6733-458b-acb1-d7d304fcd582/Untitled.png)

- Redis에서 **SortedSet의 Score는 Double 타입이므로, 정수 부분은 맞은 개수로 소수 부분은 남은 시간으로 설정한 점수 시스템을 적용한다면, 추가적인 자료구조를 사용하지 않고 쉽게 랭킹을 구할 수 있을 것이라고 판단**했습니다.
    - 이를 통해 추가적인 Redis Collection 없이, 하나의 **Redis 자료구조만을 활용**하여 **메모리를 절약**할 수 있었습니다.

### 3. MongoDB 보안 이슈

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/26675790-3f23-4934-8568-87a446ad6339/Untitled.png)

- 프로젝트를 진행하면서, 편의를 위해 잠시 MongoDB server의 접근 권한을 열어둔 적이 있습니다.
- 해당 기간에 MongoDB Database Set이 해킹 당하는 일이 있었고, 프로젝트의 모든 Data가 사라졌습니다. 이를 통해 보안의 필요성을 알게 되었고, 사용자 역할 별로 DB 접근 권한을 부여하여 보안을 강화하였습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1811f255-4ac2-47fe-a615-ef61784b0097/Untitled.png)
