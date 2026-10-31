# 692. Top K Frequent Words

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/top-k-frequent-words](https://leetcode.com/problems/top-k-frequent-words)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Box, Ebay, Goldman Sachs, Google, Meta, Microsoft, Oracle, Palo Alto Networks, Paypal, Pocket Gems, Redfin, Rippling, Robinhood, Salesforce, Servicenow, Tiktok, Uber, Walmart Labs, Yelp, Zynga

---

## 1. Problem Description

Given an array of strings `words` and an integer `k`, return *the* `k` *most frequent strings*.

Return the answer **sorted** by **the frequency** from highest to lowest. Sort the words with the same frequency by their **lexicographical order**.

**Constraints:**
- `1 <= words.length <= 500`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters.
- `k` is in the range `[1, The number of **unique** words[i]]`

**Follow-up:** Could you solve it in `O(n log(k))` time and `O(n)` extra space?

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

## 3. Examples

**Example 1:**
```
Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
Explanation: "i" and "love" are the two most frequent words.
Note that "i" comes before "love" due to a lower alphabetical order.
```

**Example 2:**
```
Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
Output: ["the","is","sunny","day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.
```

---

## 4. Walkthrough

Consider Example 1. Frequency map: {"i":2, "love":2, "leetcode":1, "coding":1}. We push each pair into a min-heap of size k=2.

1. Push (2, "i") → heap [(2,"i")]
2. Push (2, "love") → heap [(2,"i"), (2,"love")]
3. Push (1, "leetcode") → heap size exceeds 2, pop worst (1, "leetcode"). Heap unchanged.
4. Push (1, "coding") → pop (1, "coding").

Heap now contains (2,"i") and (2,"love"). Popping yields ["love","i"], reverse → ["i","love"].

---

## 5. Complexity Analysis

- **Time:** O(n log k) for building the heap, where n is number of words.
- **Space:** O(n) for the frequency map plus O(k) for the heap.

---

## 6. Follow-Up Questions

1. How would you modify the solution to return the words in **any** order?
2. Can you solve the problem in O(n) time using a bucket sort based on frequencies?
3. How would you handle streaming input where words arrive continuously?

---

## Key Takeaway

> Min-heap of size k for top-k problems. The tricky part is the custom comparator: for a min-heap, invert the comparison so the "worst" candidate is at the top (ready to be evicted).