# 284. Peeking Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/peeking-iterator](https://leetcode.com/problems/peeking-iterator)
**Companies:** Apple, Google, Yahoo

---

```
CLASS PeekingIterator:
    CONSTRUCTOR(iterator):
        self.iter = iterator
        self.peeked = null; self.hasPeeked = false

    FUNCTION peek():
        IF NOT hasPeeked: peeked = iter.next(); hasPeeked = true
        RETURN peeked

    FUNCTION next():
        IF hasPeeked: hasPeeked = false; RETURN peeked
        RETURN iter.next()

    FUNCTION hasNext():
        RETURN hasPeeked OR iter.hasNext()
```
