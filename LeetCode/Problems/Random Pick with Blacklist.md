# 710. Random Pick with Blacklist

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/random-pick-with-blacklist](https://leetcode.com/problems/random-pick-with-blacklist)
**Companies:** Amazon, Google, Uber

---

```
CLASS Solution:
    CONSTRUCTOR(n, blacklist):
        self.size = n - len(blacklist)
        blackSet = SET(blacklist)
        // Map blacklisted numbers in [0, size) to non-blacklisted in [size, n)
        self.mapping = {}
        j = n - 1
        FOR b IN blacklist:
            IF b < self.size:
                WHILE j IN blackSet: j -= 1
                mapping[b] = j; j -= 1

    FUNCTION pick():
        r = random(0, size - 1)
        RETURN mapping.get(r, r)
```
