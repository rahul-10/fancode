# js-assignment

```
instructions.txt has the instructions to run the service
guidelines.txt has the guidelines to be followed while solving and submitting the assignment
problem-statement.txt has the problems statements to be solved
```

## Solution

### Assumpition while creating solution -

```
1. News created for match is also belongs to corresponding tour but not belons to corresponding sport.
2. While fetching news based on matchId returing news created againest same matchId.
3. While fetching news based on tourId returning news created againest same tourId as well as news created agained matchs of that tourId.
4. While fetching news based on sportId returing news created againest tours of that sport.
5. Created news table schema keeping in mind that read queries would be way more higher than the write queries.
```

### News table schema -

```
id  -->  primary key,
title,
description,
type ENUM('match', 'tour'), --> Can be used to identify whether news was created against match or tour
matchId, ---> matchId against which news was created
tourId, ---> tourId against which news was created or tour is associated with match for which news was created.
sportId, ---> sport associated with tour for which news was created.
recUpdatedAt ,
createdAt,
foreign key (matchId) references matches(id),
foreign key (tourId) references tours(id),
foreign key (sportId) references sports(id)

Also applied contraint that only one of matchId or sportId can be null-
ALTER TABLE mydb.news
ADD CONSTRAINT CheckOnlyOneColumnIsNull
CHECK
(
    ( CASE WHEN matchId IS NULL THEN 0 ELSE 1 END
    + CASE WHEN sportId IS NULL THEN 0 ELSE 1 END
    ) = 1
)

```

#### Wrote unit tests for methods of news controllers only becasuse of time crunch.

### Curl for create news endpoint

```
curl --location 'http://localhost:3000/news' \
--header 'Content-Type: application/json' \
--data '{
    "title": "New News",
    "description": "here comes description",
    "matchId": "5",
    "tourId": "?"
}'
```

### Curl for get news endpoint

```
curl --location 'http://localhost:3000/news?matchId=5&tourId=1&sportId=1'
```
