set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


 CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."articles" (
	"articleId" serial NOT NULL,
	"articleTypeId" int NOT NULL,
	"imgUrl" TEXT NOT NULL,
	"primaryColor" TEXT NOT NULL,
	"secondaryColor" TEXT,
	"userId" int NOT NULL,
	"colorCategoryId" int NOT NULL,
	"secondaryColorCategoryId" int,
	CONSTRAINT "articles_pk" PRIMARY KEY ("articleId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."colorCategories" (
	"colorCategoryId" int NOT NULL,
	"colorCategory" TEXT NOT NULL,
	CONSTRAINT "colorCategories_pk" PRIMARY KEY ("colorCategoryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."articleTypes" (
	"articleTypeId" int NOT NULL,
	"articleType" TEXT NOT NULL,
	CONSTRAINT "articleTypes_pk" PRIMARY KEY ("articleTypeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."outfits" (
	"outfitId" serial NOT NULL,
	"topArticleId" int NOT NULL,
	"bottomArticleId" int NOT NULL,
	"shoesArticleId" int NOT NULL,
	"userId" int NOT NULL,
	CONSTRAINT "outfits_pk" PRIMARY KEY ("outfitId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "articles" ADD CONSTRAINT "articles_fk0" FOREIGN KEY ("articleTypeId") REFERENCES "articleTypes"("articleTypeId");
ALTER TABLE "articles" ADD CONSTRAINT "articles_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "articles" ADD CONSTRAINT "articles_fk2" FOREIGN KEY ("colorCategoryId") REFERENCES "colorCategories"("colorCategoryId");
ALTER TABLE "articles" ADD CONSTRAINT "articles_fk3" FOREIGN KEY ("secondaryColorCategoryId") REFERENCES "colorCategories"("colorCategoryId");



ALTER TABLE "outfits" ADD CONSTRAINT "outfits_fk0" FOREIGN KEY ("topArticleId") REFERENCES "articles"("articleId");
ALTER TABLE "outfits" ADD CONSTRAINT "outfits_fk1" FOREIGN KEY ("bottomArticleId") REFERENCES "articles"("articleId");
ALTER TABLE "outfits" ADD CONSTRAINT "outfits_fk2" FOREIGN KEY ("shoesArticleId") REFERENCES "articles"("articleId");
ALTER TABLE "outfits" ADD CONSTRAINT "outfits_fk3" FOREIGN KEY ("userId") REFERENCES "users"("userId");
