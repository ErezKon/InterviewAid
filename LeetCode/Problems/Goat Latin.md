# 824. Goat Latin

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/goat-latin](https://leetcode.com/problems/goat-latin)
**Companies:** Apple, Meta, Microsoft

---

## 1. Problem Description

Apply Goat Latin rules: vowel-starting words get `"ma"` appended; consonant-starting words move the first letter to end then add `"ma"`. Add `i+1` `'a'`s to the i-th word.

## 2. Examples

| Input | Output |
|-------|--------|
| "I speak Goat Latin" | "Imaa peaksmaaa oatGmaaaa atinLmaaaaa" |
| "The quick brown fox jumped over the lazy dog" | "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa" |

*Explanation*: Each word is transformed according to the rules and suffixed with an increasing number of `'a'` characters.

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
