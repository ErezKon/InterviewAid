# 3478. Choose K Elements With Maximum Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/choose-k-elements-with-maximum-sum](https://leetcode.com/problems/choose-k-elements-with-maximum-sum)
**Companies:** Bloomberg

---

## 1. Problem Description

Given two arrays `nums1` and `nums2` of length `n`, and an integer `k`, for each index `i`, find the maximum sum of `k` elements from `nums2` where the corresponding `nums1` value is **strictly less** than `nums1[i]`. Return an answer array.

---

## 2. Key Insight

> Sort indices by `nums1`. Process in order, maintaining a min-heap of size `k` from `nums2` values seen so far (all with strictly smaller `nums1`). When `nums1` changes, update the running sum.

---

## 3. Approach: Sort + Min-Heap — O(n log n) ✅

```
FUNCTION maxSum(nums1, nums2, k):
    indices = SORT by nums1 value
    heap = min-heap of size k
    currentSum = 0
    answer = [0] * n
    
    group indices by nums1 value (process ties together)
    
    FOR each group of indices with same nums1 value:
        // answer for these indices uses heap built from previous groups
        FOR idx IN group:
            answer[idx] = currentSum
        // now add this group's nums2 values to the heap
        FOR idx IN group:
            IF heap.size < k:
                push nums2[idx], currentSum += nums2[idx]
            ELSE IF nums2[idx] > heap.top:
                currentSum -= heap.pop()
                heap.push(nums2[idx])
                currentSum += nums2[idx]
    
    RETURN answer
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## Key Takeaway

> When you need the top-k elements from a prefix, a min-heap of size k maintained while scanning sorted data gives O(n log k) performance.
