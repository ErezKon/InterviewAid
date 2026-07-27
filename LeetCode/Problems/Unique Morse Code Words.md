# 804. Unique Morse Code Words

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Wix
---

```
FUNCTION uniqueMorseRepresentations(words):
    morse = ['.-','-...','-.-.','-..','.','..-.','--.','....','..','.---','-.-','.-..','--','-.','---','.--.','--.-','.-.','...','-','..-','...-','.--','-..-','-.--','--..']
    RETURN len(SET(JOIN(morse[ord(c)-ord('a')] for c in w) for w in words))
```
