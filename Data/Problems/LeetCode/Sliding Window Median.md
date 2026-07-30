# 480. Sliding Window Median

**Difficulty:** 🔴 Hard
**Acceptance:** 40.0%
**LeetCode:** [https://leetcode.com/problems/sliding-window-median](https://leetcode.com/problems/sliding-window-median)
**Companies:** Amazon, Apple, Bloomberg, Datadog, Doordash, Google, Meta, Microsoft, Salesforce, Snapchat, Spotify

---

## 1. Problem Description

Given an integer array `nums` and a window size `k`, return an array of the median of each sliding window of size `k` as it moves from left to right across `nums`.

---

## 2. Approach: Two Heaps with Lazy Deletion — O(n log k) ✅

```text
FUNCTION medianSlidingWindow(nums, k):
    // maxHeap holds the smaller half, minHeap the larger half
    maxHeap ← MaxHeap()
    minHeap ← MinHeap()
    result ← []
    toRemove ← map()
    balance ← 0

    // Initialize first window
    FOR i ← 0 TO k-1:
        maxHeap.PUSH(nums[i])
    FOR i ← 0 TO k/2 - 1:
        minHeap.PUSH(maxHeap.POP())

    // Process each window
    FOR i ← k TO LENGTH(nums):
        // Record median
        IF k IS ODD:
            APPEND maxHeap.TOP() TO result
        ELSE:
            APPEND (maxHeap.TOP() + minHeap.TOP()) / 2.0 TO result
        IF i == LENGTH(nums): BREAK
        outgoing ← nums[i - k]
        incoming ← nums[i]

        // Mark outgoing for lazy removal and adjust balance
        IF outgoing ≤ maxHeap.TOP():
            SET balance ← balance - 1
        ELSE:
            SET balance ← balance + 1
        INCREMENT toRemove[outgoing]

        // Insert incoming and adjust balance
        IF incoming ≤ maxHeap.TOP():
            maxHeap.PUSH(incoming)
            SET balance ← balance + 1
        ELSE:
            minHeap.PUSH(incoming)
            SET balance ← balance - 1

        // Rebalance heaps based on balance
        IF balance > 0:
            minHeap.PUSH(maxHeap.POP())
            SET balance ← balance - 2
        ELSE IF balance < 0:
            maxHeap.PUSH(minHeap.POP())
            SET balance ← balance + 2

        // Lazy cleanup of top elements marked for removal
        WHILE maxHeap.TOP() IN toRemove AND toRemove[maxHeap.TOP()] > 0:
            DECREMENT toRemove[maxHeap.TOP()]
            maxHeap.POP()
        WHILE minHeap.TOP() IN toRemove AND toRemove[minHeap.TOP()] > 0:
            DECREMENT toRemove[minHeap.TOP()]
            minHeap.POP()

    RETURN result
```

---

## 3. Examples

| nums | k | Output |
|------|---|--------|
| `[1,3,-1,-3,5,3,6,7]` | 3 | `[1,-1,-1,3,5,6]` |
| `[1,2,3,4,2,3,1,4,2]` | 3 | `[2,3,3,3,2,3,2]` |

---

## 4. Walkthrough

Take `nums = [1,3,-1,-3,5,3,6,7]`, `k = 3`.

1. **Initial window** `[1,3,-1]` → heaps balanced → median `1`.
2. Slide: remove `1`, add `-3`. Heaps rebalance → median `-1`.
3. Slide: remove `3`, add `5`. Median `-1`.
4. Continue similarly, producing `[1,-1,-1,3,5,6]`.

---

## 5. Complexity Analysis

- **Time:** O(n log k) – each insertion/removal costs `log k`.
- **Space:** O(k) – the two heaps store at most `k` elements plus the lazy‑deletion map.

---

## 6. Follow-Up Questions

- How to support **arbitrary deletions** without lazy deletion?
- Can we achieve **O(n)** time using a balanced BST with order‑statistics?
- What changes for **even‑length windows** returning the lower median?

---

## Key Takeaway

> Sliding‑window median extends the classic two‑heap median‑maintenance technique with lazy deletion to efficiently evict elements that leave the window.
