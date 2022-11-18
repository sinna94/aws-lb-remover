# aws-lb-remover
Remove AWS Load Balancer By Subnet ID

## build

### node

```shell
npm run build
```

### executable

```shell
npm run package

-- windows
npm run package-win

-- macos
npm run package-mac

-- linux
npm run package-linux
```

## run

#### AWS 자격증명
* Linux, Unix 및 macOS의 공유 자격 증명 파일: ~/.aws/credentials
* Windows의 공유 자격 증명 파일: C:\Users\USER_NAME\.aws\credentials

위의 파일을 생성하여 아래와 같이 내용을 넣습니다.

```properties
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```
#### Arguments

| argument    | required | description                                   |
|-------------|----------|-----------------------------------------------|
| subnetIds | O        | load balancer 가 사용하는 서브넷 ID 목록 ex) subnet-xxxxxx,subnet-aaaaaa |
| region      | O        | AWS Region 예) ap-northeast-2                  |

### node

```shell
node ./dist/main.js --subnetIds ${subnetIds} --region ${region}
```

### executable

```shell
./aws-lb-remover --subnetIds ${subnetIds} --region ${region}
```
