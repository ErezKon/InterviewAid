# 824. Goat Latin

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/goat-latin](https://leetcode.com/problems/goat-latin)
**Companies:** Apple, Meta, Microsoft

---

## 1. Problem Description

You are given a string `sentence` that consist of words separated by spaces. Each word consists of lowercase and uppercase letters only.

We would like to convert the sentence to "Goat Latin" (a made-up language similar to Pig Latin.) The rules of Goat Latin are as follows:

- If a word begins with a vowel (`'a'`, `'e'`, `'i'`, `'o'`, or `'u'`), append `"ma"` to the end of the word.
  - For example, the word `"apple"` becomes `"applema"`.
- If a word begins with a consonant (i.e., not a vowel), remove the first letter and append it to the end, then add `"ma"`.
  - For example, the word `"goat"` becomes `"oatgma"`.
- Add one letter `'a'` to the end of each word per its word index in the sentence, starting with `1`.
  - For example, the first word gets `"a"` added to the end, the second word gets `"aa"` added to the end, and so on.

Return *the final sentence representing the conversion from sentence to Goat Latin*.

**Constraints:**
- `1 <= sentence.length <= 150`
- `sentence` consists of English letters and spaces.
- `sentence` has no leading or trailing spaces.
- All the words in `sentence` are separated by a single space.

## 2. Examples

```
Example 1:
  Input: sentence = "I speak Goat Latin"
  Output: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
```
```
Example 2:
  Input: sentence = "The quick brown fox jumped over the lazy dog"
  Output: "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"
```

## 3. Walkthrough

**Example**: "I speak Goat Latin"

| Step | Word | Transformation | Result |
|------|------|----------------|--------|
| 1 | I | vowel → I + "ma" + "a" (1st word) | Imaa |
| 2 | speak | consonant → peak + "s" + "ma" + "aa" (2nd word) | peaksmaaa |
| 3 | Goat | consonant → oat + "G" + "ma" + "aaa" (3rd word) | oatGmaaaa |
| 4 | Latin | consonant → atin + "L" + "ma" + "aaaa" (4th word) | atinLmaaaaa |

Final sentence: `Imaa peaksmaaa oatGmaaaa atinLmaaaaa`.

## 4. Approach

**Algorithm**: Iterate over words, apply vowel/consonant rule, append `'ma'`, then append `'a'` repeated (index+1).

```text
FUNCTION toGoatLatin(sentence):
    SET vowels ← SET('aeiouAEIOU')
    SET words ← SPLIT(sentence, ' ')
    SET result ← []
    FOR i FROM 0 TO LENGTH(words)-1:
        SET word ← words[i]
        IF word[0] IN vowels:
            SET transformed ← word + 'ma'
        ELSE:
            SET transformed ← SUBSTRING(word, 1) + word[0] + 'ma'
        ENDIF
        SET transformed ← transformed + REPEAT('a', i+1)
        APPEND transformed TO result
    ENDFOR
    RETURN JOIN(result, ' ')
```

## 5. Complexity Analysis

- **Time**: O(n) where n is total characters in the sentence (each character visited once).
- **Space**: O(n) for the output string and list of words.

## 6. Follow-Up Questions

- How would you modify the algorithm to handle punctuation attached to words?
- Can you solve the problem in-place without using extra space for a word list?
- How would you adapt the solution for streaming input where the sentence is received word by word?

## Key Takeaway

> Process each word by checking its first character, apply the appropriate Goat Latin transformation, and append an increasing number of `'a'` characters based on the word's position.
