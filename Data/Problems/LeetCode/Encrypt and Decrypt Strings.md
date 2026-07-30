# 2227. Encrypt and Decrypt Strings

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Duolingo, Google

---

## Problem Description
You are given a list of dictionary words and two integer arrays `keys` and `values` of equal length. To **encrypt** a word, replace each character `c` with the string representation of `values[i]` where `keys[i] == c`. Concatenate these numbers to form the encrypted string. To **decrypt**, given an encrypted string `s`, count how many dictionary words encrypt exactly to `s`. Return the count for each query string.
All operations must run efficiently for up to 10⁴ words and queries.

## Examples
```text
keys = ["a","b","c"], values = ["1","2","3"]
Dictionary = ["abc","cba","aa"]
Encrypt("abc") → "123"
Decrypt("123") → 1   // only "abc" matches
Decrypt("321") → 1   // only "cba" matches
Decrypt("11") → 1    // only "aa" matches
```

## Approach
Pre‑process the dictionary: for each word compute its encrypted form using a hash map from character to value, then store the frequency of each encrypted string. Decryption queries become a simple lookup.

## Pseudocode
```text
FUNCTION buildEncryptionMap(keys, values):
    SET map ← empty dictionary
    FOR i FROM 0 TO LENGTH(keys)-1:
        map[keys[i]] ← values[i]
    RETURN map

FUNCTION encryptWord(word, map):
    SET enc ← ""
    FOR ch IN word:
        SET enc ← enc + map[ch]
    RETURN enc

FUNCTION preprocess(dictionary, map):
    SET freq ← empty dictionary
    FOR w IN dictionary:
        SET e ← encryptWord(w, map)
        INCREMENT freq[e] BY 1
    RETURN freq

FUNCTION decrypt(query, freq):
    RETURN freq.get(query, 0)
```

## Walkthrough
| Word | Encrypted | Frequency |
|------|-----------|-----------|
| "abc" | "123" | 1 |
| "cba" | "321" | 1 |
| "aa"  | "11"  | 1 |

A query `"123"` looks up `freq["123"]` → 1.

## Complexity Analysis
- **Pre‑processing:** O(N·L) where N is number of dictionary words and L is average word length.
- **Query:** O(1) lookup per encrypted string.
- **Space:** O(N·L) for storing encrypted forms and their counts.

## Follow‑Up Questions
- How would you handle collisions if two different characters map to the same value?
- Can you support dynamic updates to the dictionary (add/remove words) efficiently?
- What if the encryption uses a reversible algorithm instead of a simple lookup?

## Key Takeaway
Pre‑computing encrypted representations and counting frequencies turns decryption into constant‑time lookups, enabling fast queries even with large dictionaries.
