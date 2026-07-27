# 767. Reorganize String

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/reorganize-string](https://leetcode.com/problems/reorganize-string)
**Companies:** Agoda, Amazon, Audible, Bloomberg, Citadel, De Shaw, Ebay, Expedia, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Oracle, Pinterest, Roblox, Salesforce, Tesla, Tiktok, Zoho

---

## 1. Problem Description

Given a string `s`, rearrange characters so that no two adjacent characters are the same. Return `""` if impossible.

---

## 2. Approach: Max-Heap — O(n log 26) = O(n) ✅

```
FUNCTION reorganizeString(s):
    count = frequency of s
    IF any count > (len(s) + 1) / 2: RETURN ""

    heap = MaxHeap of (count, char) for each char
    result = []
    prev = (0, '')

    WHILE heap:
        (cnt, char) = heap.POP()
        result.ADD(char)

        // Re-add the previous character (cooldown of 1)
        IF prev[0] > 0:
            heap.PUSH(prev)

        prev = (cnt - 1, char)

    RETURN JOIN(result)
```

| Time | Space |
|------|-------|
| O(n) | O(26) |

---

## Key Takeaway

> Same greedy pattern as Task Scheduler: pick the most frequent character, but delay re-adding it until after the next pick (cooldown = 1 position).
