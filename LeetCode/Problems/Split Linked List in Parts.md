# 725. Split Linked List in Parts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-linked-list-in-parts](https://leetcode.com/problems/split-linked-list-in-parts)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION splitListToParts(head, k):
    length = count nodes
    partSize = length / k
    extra = length % k

    result = [null] * k
    curr = head

    FOR i ← 0 TO k - 1:
        result[i] = curr
        size = partSize + (1 IF i < extra ELSE 0)
        FOR _ ← 1 TO size - 1:
            curr = curr.next
        IF curr:
            next = curr.next
            curr.next = null
            curr = next

    RETURN result
```
