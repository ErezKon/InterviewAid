# 632. Smallest Range Covering Elements from K Lists

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists)
**Companies:** Amazon, Bloomberg, Flipkart, Google, Linkedin, Lyft, Meta, Microsoft, Phonepe, Winzo

---

## Problem Description

You are given `k` sorted lists of integers. Find the smallest range `[min, max]` that includes at least one number from each of the `k` lists. The smallest range is defined by the one with the minimum difference `max - min`. If there is a tie, choose the one with the smaller `min` value.

## Examples

- **Input:** `nums = [[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]`
  - **Output:** `[20, 24]`. The range `[20, 24]` contains `24` from list 1, `20` from list 2, and `22` from list 3.

## Approach: Min-Heap + Sliding Window [Time: O(N log k), Space: O(k)]

This problem can be modeled as finding the shortest subarray in a merged, sorted list of all elements that contains one element from each of the `k` original lists. A more efficient approach uses a min-heap to keep track of the current smallest element among the `k` lists.

1.  **Initialize:** Create a min-heap and add the first element from each of the `k` lists. Also, keep track of the maximum value seen so far among these initial elements. This defines our initial range.
2.  **Iterate:** In a loop, extract the minimum element from the heap. This element is the current `min` of our window.
3.  **Update Range:** Compare the current range `[min, max]` with the best range found so far and update if it's smaller.
4.  **Advance Pointer:** Take the next element from the list that the extracted minimum came from. Add it to the heap and update the overall `max` value.
5.  **Termination:** If any list is exhausted (we can't get a next element), we can stop, as we can no longer form a valid range.

```
FUNCTION smallestRange(nums):
    // Heap stores (value, list_index, element_index)
    min_heap = MIN_HEAP()
    current_max = -INFINITY

    // Initialize heap with the first element of each list
    FOR i FROM 0 TO len(nums) - 1:
        HEAP_PUSH(min_heap, (nums[i][0], i, 0))
        current_max = MAX(current_max, nums[i][0])

    min_range_size = INFINITY
    best_range = [-1, -1]

    WHILE min_heap.size() == len(nums):
        min_val, list_idx, elem_idx = HEAP_POP(min_heap)

        // Update best range if current one is smaller
        IF current_max - min_val < min_range_size:
            min_range_size = current_max - min_val
            best_range = [min_val, current_max]

        // Add the next element from the list of the popped element
        IF elem_idx + 1 < len(nums[list_idx]):
            next_val = nums[list_idx][elem_idx + 1]
            HEAP_PUSH(min_heap, (next_val, list_idx, elem_idx + 1))
            current_max = MAX(current_max, next_val)

    RETURN best_range
```

## Complexity

| | Time | Space |
| :-- | :--- | :--- |
| **Overall** | O(N log k) | O(k) |

- `N` is the total number of elements across all lists.
- `k` is the number of lists.
- We iterate through each of the `N` elements at most once. Each heap operation (push/pop) takes O(log k) time.
- The space complexity is O(k) for storing one element from each list in the heap.
