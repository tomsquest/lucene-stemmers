/*
 * This algorithm is updated based on code located at:
 * http://members.unine.ch/jacques.savoy/clef/
 *
 * Full copyright for that code follows:
 */

/*
 * Copyright (c) 2005, Jacques Savoy
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer. Redistributions in binary
 * form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials
 * provided with the distribution. Neither the name of the author nor the names
 * of its contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Light Stemmer for Italian.
 *
 * <p>This stemmer implements the algorithm described in: <i>Report on CLEF-2001 Experiments</i>
 * Jacques Savoy
 *
 * This is the port of org.apache.lucene.analysis.it.ItalianLightStemmer
 *
 * @see https://gitbox.apache.org/repos/asf?p=lucene.git;a=blob;f=lucene/analysis/common/src/java/org/apache/lucene/analysis/it/ItalianLightStemFilter.java
 */
export const stemItalianLight = (
  s: string | null | undefined
): string | null | undefined => {
  if (!s) return s;

  const chars = s.split("");
  const len = stem(chars, chars.length);
  return chars.slice(0, len).join("");
};

const stem = (s: string[], len: number): number => {
  if (len < 6) return len;

  for (let i = 0; i < len; i++) {
    switch (s[i]) {
      case "à":
      case "á":
      case "â":
      case "ä":
        s[i] = "a";
        break;
      case "ò":
      case "ó":
      case "ô":
      case "ö":
        s[i] = "o";
        break;
      case "è":
      case "é":
      case "ê":
      case "ë":
        s[i] = "e";
        break;
      case "ù":
      case "ú":
      case "û":
      case "ü":
        s[i] = "u";
        break;
      case "ì":
      case "í":
      case "î":
      case "ï":
        s[i] = "i";
        break;
    }
  }

  switch (s[len - 1]) {
    case "e":
      if (s[len - 2] == "i" || s[len - 2] == "h") return len - 2;
      else return len - 1;
    case "i":
      if (s[len - 2] == "h" || s[len - 2] == "i") return len - 2;
      else return len - 1;
    case "a":
      if (s[len - 2] == "i") return len - 2;
      else return len - 1;
    case "o":
      if (s[len - 2] == "i") return len - 2;
      else return len - 1;
  }

  return len;
};
