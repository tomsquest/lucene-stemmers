import { stemFrenchLight } from "./stemFrenchLight";
import { readFileSync } from "fs";
import { join } from "path";

// https://gitbox.apache.org/repos/asf?p=lucene.git;a=blob;f=lucene/analysis/common/src/test/org/apache/lucene/analysis/fr/TestFrenchLightStemFilter.java

test("empty", () => {
  expect(stemFrenchLight(null)).toEqual(null);
  expect(stemFrenchLight(undefined)).toEqual(undefined);
  expect(stemFrenchLight("")).toEqual("");
});

test("examples", () => {
  expect(stemFrenchLight("chevaux")).toEqual("cheval");
  expect(stemFrenchLight("cheval")).toEqual("cheval");

  expect(stemFrenchLight("hiboux")).toEqual("hibou");
  expect(stemFrenchLight("hibou")).toEqual("hibou");

  expect(stemFrenchLight("chantés")).toEqual("chant");
  expect(stemFrenchLight("chanter")).toEqual("chant");
  expect(stemFrenchLight("chante")).toEqual("chant");
  expect(stemFrenchLight("chant")).toEqual("chant");

  expect(stemFrenchLight("baronnes")).toEqual("baron");
  expect(stemFrenchLight("barons")).toEqual("baron");
  expect(stemFrenchLight("baron")).toEqual("baron");

  expect(stemFrenchLight("peaux")).toEqual("peau");
  expect(stemFrenchLight("peau")).toEqual("peau");

  expect(stemFrenchLight("anneaux")).toEqual("aneau");
  expect(stemFrenchLight("anneau")).toEqual("aneau");

  expect(stemFrenchLight("neveux")).toEqual("neveu");
  expect(stemFrenchLight("neveu")).toEqual("neveu");

  expect(stemFrenchLight("affreux")).toEqual("afreu");
  expect(stemFrenchLight("affreuse")).toEqual("afreu");

  expect(stemFrenchLight("investissement")).toEqual("investi");
  expect(stemFrenchLight("investir")).toEqual("investi");

  expect(stemFrenchLight("assourdissant")).toEqual("asourdi");
  expect(stemFrenchLight("assourdir")).toEqual("asourdi");

  expect(stemFrenchLight("pratiquement")).toEqual("pratiqu");
  expect(stemFrenchLight("pratique")).toEqual("pratiqu");

  expect(stemFrenchLight("administrativement")).toEqual("administratif");
  expect(stemFrenchLight("administratif")).toEqual("administratif");

  expect(stemFrenchLight("justificatrice")).toEqual("justifi");
  expect(stemFrenchLight("justificateur")).toEqual("justifi");
  expect(stemFrenchLight("justifier")).toEqual("justifi");

  expect(stemFrenchLight("educatrice")).toEqual("eduqu");
  expect(stemFrenchLight("eduquer")).toEqual("eduqu");

  expect(stemFrenchLight("communicateur")).toEqual("comuniqu");
  expect(stemFrenchLight("communiquer")).toEqual("comuniqu");

  expect(stemFrenchLight("accompagnatrice")).toEqual("acompagn");
  expect(stemFrenchLight("accompagnateur")).toEqual("acompagn");

  expect(stemFrenchLight("administrateur")).toEqual("administr");
  expect(stemFrenchLight("administrer")).toEqual("administr");

  expect(stemFrenchLight("productrice")).toEqual("product");
  expect(stemFrenchLight("producteur")).toEqual("product");

  expect(stemFrenchLight("acheteuse")).toEqual("achet");
  expect(stemFrenchLight("acheteur")).toEqual("achet");

  expect(stemFrenchLight("planteur")).toEqual("plant");
  expect(stemFrenchLight("plante")).toEqual("plant");

  expect(stemFrenchLight("poreuse")).toEqual("poreu");
  expect(stemFrenchLight("poreux")).toEqual("poreu");

  expect(stemFrenchLight("plieuse")).toEqual("plieu");

  expect(stemFrenchLight("bijoutière")).toEqual("bijouti");
  expect(stemFrenchLight("bijoutier")).toEqual("bijouti");

  expect(stemFrenchLight("caissière")).toEqual("caisi");
  expect(stemFrenchLight("caissier")).toEqual("caisi");

  expect(stemFrenchLight("abrasive")).toEqual("abrasif");
  expect(stemFrenchLight("abrasif")).toEqual("abrasif");

  expect(stemFrenchLight("folle")).toEqual("fou");
  expect(stemFrenchLight("fou")).toEqual("fou");

  expect(stemFrenchLight("personnelle")).toEqual("person");
  expect(stemFrenchLight("personne")).toEqual("person");

  // algo bug: too short length
  // expect(stemFrenchLight("personnel")).toEqual( "person");

  expect(stemFrenchLight("complète")).toEqual("complet");
  expect(stemFrenchLight("complet")).toEqual("complet");

  expect(stemFrenchLight("aromatique")).toEqual("aromat");

  expect(stemFrenchLight("faiblesse")).toEqual("faibl");
  expect(stemFrenchLight("faible")).toEqual("faibl");

  expect(stemFrenchLight("patinage")).toEqual("patin");
  expect(stemFrenchLight("patin")).toEqual("patin");

  expect(stemFrenchLight("sonorisation")).toEqual("sono");

  expect(stemFrenchLight("ritualisation")).toEqual("rituel");
  expect(stemFrenchLight("rituel")).toEqual("rituel");

  // algo bug: masked by rules above
  // expect(stemFrenchLight("colonisateur")).toEqual( "colon");

  expect(stemFrenchLight("nomination")).toEqual("nomin");

  expect(stemFrenchLight("disposition")).toEqual("dispos");
  expect(stemFrenchLight("dispose")).toEqual("dispos");

  // SOLR-3463 : abusive compression of repeated characters in numbers
  // Trailing repeated char elision :
  expect(stemFrenchLight("1234555")).toEqual("1234555");
  // Repeated char within numbers with more than 4 characters :
  expect(stemFrenchLight("12333345")).toEqual("12333345");
  // Short numbers weren't affected already:
  expect(stemFrenchLight("1234")).toEqual("1234");
  // Ensure behaviour is preserved for words!
  // Trailing repeated char elision :
  expect(stemFrenchLight("abcdeff")).toEqual("abcdef");
  // Repeated char within words with more than 4 characters :
  expect(stemFrenchLight("abcccddeef")).toEqual("abcdef");
  expect(stemFrenchLight("créées")).toEqual("cre");
  // Combined letter and digit repetition
  expect(stemFrenchLight("22hh00")).toEqual("22h00"); // 10:00pm
});

test("vocabulary", () => {
  readFileSync(join(__dirname, "..", "data", "frlight.txt"), {
    encoding: "utf8",
  })
    .split(/\n/)
    .filter(Boolean)
    .forEach((line) => {
      const [actual, expected] = line.split("\t");
      expect(stemFrenchLight(actual)).toEqual(expected);
    });
});
