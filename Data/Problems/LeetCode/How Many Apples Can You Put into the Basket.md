# 1196. How Many Apples Can You Put into the Basket

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/how-many-apples-can-you-put-into-the-basket](https://leetcode.com/problems/how-many-apples-can-you-put-into-the-basket)
**Companies:** Virtu

---

## 1. Problem Description

Given apple weights, find the maximum number that fit in a basket with capacity 5000.

---

## 2. Examples

**Example 1:**
```
Input: weight = [100,200,150,80,120]
Output: 5
Explanation: All apples sum to 650 which is ≤ 5000, so all 5 can be taken.
```

**Example 2:**
```
Input: weight = [1000,2000,3000,4000]
Output: 2
Explanation: The lightest two apples (1000 + 2000 = 3000) fit, adding any heavier apple exceeds 5000.
```

---

## 3. Approach: Sort Greedy — O(n log n) ✅

```
FUNCTION maxNumberOfApples(weight):
    SORT weight
    total ← 0
    count ← 0
    FOR w IN weight DO
        IF total + w > 5000: BREAK
        total ← total + w
        count ← count + 1
    RETURN count
```

---

## 4. Walkthrough

Take `weight = [1000,2000,3000,4000]`.
1. Sort → [1000,2000,3000,4000]
2. total=0, count=0.
3. Add 1000 → total=1000, count=1.
4. Add 2000 → total=3000, count=2.
5. Next 3000 would make total=6000 > 5000, stop.
Result = 2 apples.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) | O(1) |

---

## 6. Follow-Up Questions

1. How would you handle a scenario where each apple has a different profit value?
2. Can you solve it in O(n) time if the weights are already bounded (e.g., ≤ 5000)?
3. What if the basket capacity changes dynamically?

---

## Key Takeaway

> Sort by weight ascending, greedily add lightest apples until capacity is reached.
