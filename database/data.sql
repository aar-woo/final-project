insert into "users" ("username", "password")
  values ('demo', '$argon2i$v=19$m=4096,t=3,p=1$MAljZDcj5w3iOz4w/Ad9qA$Lpd5dkap4UbvsMm3DiMueGYd8HVie6C5AY2hwKy92H4');

insert into "colorCategories" ("colorCategoryId", "colorCategory")
  values (0, 'none'),
         (1, 'black'),
         (2, 'white'),
         (3, 'grey'),
         (4, 'red'),
         (5, 'yellow'),
         (6, 'green'),
         (7, 'cyan'),
         (8, 'blue'),
         (9, 'magenta'),
         (10, 'khaki');

insert into "articleTypes" ("articleTypeId", "articleType")
  values (1, 'top'),
         (2, 'bottom'),
         (3, 'shoes');


insert into "articles" ("articleTypeId", "imgUrl", "primaryColor", "secondaryColor",
                        "userId", "colorCategoryId", "secondaryColorCategoryId")
        values (1, 'https://outfit-inventory.s3.amazonaws.com/1637270246018.JPEG
                ', 'rgb(29, 27, 27)', 'black', 1, 1, 1),
              (1, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270418471.JPEG',
              'green', 'green', 1, 6, 6),
              (1, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270443190.JPEG',
              'blue', 'black', 1, 8, 1),
              (2, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270466332.JPEG',
              'rgb(25, 24, 32)', 'black', 1, 1, 1),
              (2, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270526358.JPEG',
              'khaki', 'khaki', 1, 10, 10),
              (2, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270545133.JPEG',
              'rgb(164, 4, 29)', 'rgb(209, 209, 213)', 1, 4, 2),
              (3, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270567820.JPEG',
              'white', 'blue', 1, 2, 8),
              (3, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270589194.JPEG',
              'black', 'red', 1, 1, 4),
              (1, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270624749.JPEG',
              'rgb(162, 35, 74)', 'black', 1, 4, 1),
              (1, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270659520.JPEG',
              'green', 'green', 1, 6, 6),
              (1, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270683981.JPEG',
              'white', 'grey', 1, 2, 3),
              (3, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270732582.JPEG',
              'white', 'grey', 1, 2, 3),
              (3, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270752850.JPEG',
              'white', 'red', 1, 2, 4),
              (2, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270775456.JPEG',
              'blue', 'blue', 1, 8, 8),
              (2, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270791772.JPEG',
              'black', 'grey', 1, 1, 3),
              (2, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270835236.JPEG',
              'rgb(194, 195, 191)', 'grey', 1, 3, 3),
              (2, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270857263.JPEG',
              'rgb(190, 190, 187)', 'black', 1, 3, 1),
              (1, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270885779.JPEG',
              'white', 'cyan', 1, 2, 7),
              (2, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637270970262.JPEG',
              'rgb(182, 173, 160)', 'grey', 1, 3, 3),
              (3, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637271002994.JPEG',
              'black', 'white', 1, 1, 2),
              (1, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637274996501.JPEG',
              'rgb(161, 117, 9)', 'black', 1, 5, 1),
              (3, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637275050895.JPEG',
              'white', 'khaki', 1, 2, 10),
              (1, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637275112742.JPEG',
              'blue', 'rgb(205, 205, 204)', 1, 8, 2),
              (3, 'https://outfit-inventory.s3.us-west-1.amazonaws.com/1637275203839.JPEG',
              'black', 'grey', 1, 1, 3);

insert into "outfits" ("topArticleId", "bottomArticleId", "shoesArticleId", "userId")
      values (1, 4, 8, 1), (10, 16, 20, 1)
