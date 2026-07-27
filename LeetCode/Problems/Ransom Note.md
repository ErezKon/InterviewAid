# 383. Ransom Note

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/ransom-note](https://leetcode.com/problems/ransom-note)
**Companies:** Amazon, Apple, Bloomberg, Criteo, Disney, Google, Karat, Meta, Microsoft, Sap, Spotify, Tripadvisor

---

```
FUNCTION canConstruct(ransomNote, magazine):
    count = frequency of magazine
    FOR char IN ransomNote:
        count[char] -= 1
        IF count[char] < 0: RETURN false
    RETURN true
```
