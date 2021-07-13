# Naver Translate CLI

[![dependency status](https://img.shields.io/david/pepebecker/naver-translate-cli.svg)](https://david-dm.org/pepebecker/naver-translate-cli)
[![dev dependency status](https://img.shields.io/david/dev/pepebecker/naver-translate-cli.svg)](https://david-dm.org/pepebecker/naver-translate-cli#info=devDependencies)
[![ISC-licensed](https://img.shields.io/github/license/pepebecker/naver-translate-cli.svg)](https://choosealicense.com/licenses/isc/)

## Install

```shell
npm install pepebecker/naver-translate-cli
```

## Usage

Lookup meaning
```shell
navert 한국인 # Korean, Korean people
navert 공원  # park; factory worker
```

Lookup meaning with origin language
```shell
navert -o 한국인 # (韓國人) Korean, Korean people
navert -o 공원  # (公園) park; (工員) factory worker
```

Lookup verb-stem
```shell
navert -t 예뻐   # 예쁘다
navert -t 예쁜   # 예쁘다
navert -t 예쁩니다 # 예쁘다
navert -t 예쁘거나 # 예쁘다
```

Lookup examples (including HTML tags)
```shell
navert -x 돈독하다
# <strong>돈독한</strong> 사이.
# A close relationship.

# 우리는 동기간에 우애가 <strong>돈독하다</strong>
# Siblings share a close bond in my family.

# 그들은 이웃 간의 정이 <strong>돈독하다</strong>
# The neighbors share a close bond with one another.

# 그들은 형제간의 우애가 <strong>돈독하다</strong>
# The brothers have a close loving relationship.

# 우리는 동기간에 우애가 <strong>돈독하다</strong>
# In my family, siblings have a close relationship.

# 그녀는 신앙심이 <strong>돈독하다</strong>
# She has deep faith.
```

Lookup examples (without HTML tags)
```shell
navert -xr 돈독하다
# 돈독한 사이.
# A close relationship.

# 우리는 동기간에 우애가 돈독하다
# Siblings share a close bond in my family.

# 그들은 이웃 간의 정이 돈독하다
# The neighbors share a close bond with one another.

# 그들은 형제간의 우애가 돈독하다
# The brothers have a close loving relationship.

# 우리는 동기간에 우애가 돈독하다
# In my family, siblings have a close relationship.

# 그녀는 신앙심이 돈독하다
# She has deep faith.
```

### Options

 Flag            | Short | Description
-----------------|-------|------------------------------------------------------
--enko           | -e    | Translate from English to Korean
--google         | -g    | Use Google Translate instead of Papago
--example        | -x    | Lookup examples
--strip          | -r    | Strip HTML tags from lookup results
--stem           | -t    | Lookup verb stem
--simple         | -s    | Lookup alternative simple data
--json           | -j    | Output as JSON
--part-of-speech | -p    | Include part of speech
--origin         | -o    | Include language of origin
--limit          | -l    | Limit the meanings
--delimiter      | -d    | Delimiter used to separate attributes of each lookup

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/naver-translate-cli/issues).
