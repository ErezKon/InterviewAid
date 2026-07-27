# 2182. Construct String With Repeat Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-string-with-repeat-limit](https://leetcode.com/problems/construct-string-with-repeat-limit)
**Companies:** Arista Networks, Fortinet, Google, Jpmorgan, Meta, Microsoft

---

```
FUNCTION repeatLimitedString(s, repeatLimit):
    count = Counter(s)
    heap = MaxHeap([(-ord(c), c, cnt) for c, cnt in count.items()])
    result = []

    WHILE heap:
        (_, c, cnt) = heap.POP()
        use = MIN(cnt, repeatLimit)
        result.ADD(c * use)
        cnt -= use

        IF cnt > 0:
            IF NOT heap: BREAK
            (_, c2, cnt2) = heap.POP()
            result.ADD(c2)
            cnt2 -= 1
            IF cnt2 > 0: heap.PUSH((-ord(c2), c2, cnt2))
            heap.PUSH((-ord(c), c, cnt))

    RETURN JOIN(result)
```
