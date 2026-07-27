# 432. All O`one Data Structure

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/all-oone-data-structure](https://leetcode.com/problems/all-oone-data-structure)
**Companies:** Airbnb, Amazon, Apple, Atlassian, Bloomberg, Google, Linkedin, Meta, Microsoft, Nextdoor, Uber

---

## Approach: Doubly Linked List of Buckets + Hash Map — O(1) ✅

```
CLASS AllOne:
    // Each bucket: count → set of keys
    // Doubly linked list of buckets sorted by count
    // Map: key → bucket node

    FUNCTION inc(key):
        IF key NOT IN map:
            // Add to bucket with count 1
        ELSE:
            // Move from current bucket to next bucket (count + 1)

    FUNCTION dec(key):
        // Move from current bucket to prev bucket (count - 1)
        // Remove if count becomes 0

    FUNCTION getMaxKey():
        RETURN any key from tail bucket

    FUNCTION getMinKey():
        RETURN any key from head bucket
```

Each bucket stores all keys with the same count. Inc/dec moves a key to adjacent bucket.
