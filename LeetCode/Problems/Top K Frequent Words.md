# 692. Top K Frequent Words

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/top-k-frequent-words](https://leetcode.com/problems/top-k-frequent-words)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Box, Ebay, Goldman Sachs, Google, Meta, Microsoft, Oracle, Palo Alto Networks, Paypal, Pocket Gems, Redfin, Rippling, Robinhood, Salesforce, Servicenow, Tiktok, Uber, Walmart Labs, Yelp, Zynga

---

## 1. Problem Description

Given an array of strings `words` and integer `k`, return the `k` most frequent strings sorted by frequency (descending), then alphabetically for ties.

---

## 2. Approach: Heap — O(n log k) ✅

```
FUNCTION topKFrequent(words, k):
    count = frequency map of words

    // Min-heap with custom comparator: lower freq first, or higher alpha first
    heap = MinHeap(size k, compare: by freq asc, then alpha desc)

    FOR (word, freq) IN count:
        heap.PUSH((freq, word))
        IF heap.SIZE() > k:
            heap.POP()

    // Extract in reverse order
    result = []
    WHILE heap not empty:
        result.ADD(heap.POP().word)

    RETURN REVERSE(result)
```

### Alternative: Sort all — O(n log n)

```
sorted(count.keys(), key=lambda w: (-count[w], w))[:k]
```

| Approach | Time | Space |
|----------|------|-------|
| **Heap** | **O(n log k)** | **O(n)** |
| Sort | O(n log n) | O(n) |

---

## Key Takeaway

> Min-heap of size k for top-k problems. The tricky part is the custom comparator: for a min-heap, invert the comparison so the "worst" candidate is at the top (ready to be evicted).
