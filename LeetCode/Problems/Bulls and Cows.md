# 299. Bulls and Cows

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bulls-and-cows](https://leetcode.com/problems/bulls-and-cows)
**Companies:** Amazon, Epic Systems, Flexport, Google, Meta, Zopsmart

---

```
FUNCTION getHint(secret, guess):
    bulls = cows = 0
    sCount = [0] * 10; gCount = [0] * 10

    FOR i ← 0 TO n - 1:
        IF secret[i] == guess[i]:
            bulls += 1
        ELSE:
            sCount[int(secret[i])] += 1
            gCount[int(guess[i])] += 1

    FOR d ← 0 TO 9:
        cows += MIN(sCount[d], gCount[d])

    RETURN f"{bulls}A{cows}B"
```
