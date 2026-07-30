# 2230. The Users That Are Eligible for Discount

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-users-that-are-eligible-for-discount](https://leetcode.com/problems/the-users-that-are-eligible-for-discount)
**Companies:** Analytics Quotient

---

## Problem Description
Given an integer array `purchases` where `purchases[i]` is the amount spent by the i‑th user, and an integer `discountThreshold`, return the number of users whose total purchase amount is **greater than or equal to** `discountThreshold`. Each user is counted at most once.

## Examples
**Example 1:**
```
Purchases = [120, 80, 150, 90]
DiscountThreshold = 100
Output = 2
```
Users with purchases 120 and 150 qualify.

**Example 2:**
```
Purchases = [50, 60, 70]
DiscountThreshold = 80
Output = 0
```
No user meets the threshold.

## Approach
Iterate through the array and count elements that satisfy `purchases[i] >= discountThreshold`.

```text
FUNCTION eligibleUsers(purchases, discountThreshold):
    SET count ← 0
    FOR amount IN purchases:
        IF amount ≥ discountThreshold:
            SET count ← count + 1
    RETURN count
```
The algorithm runs in linear time.

## Walkthrough
| Step | amount | condition | count |
|------|--------|-----------|-------|
| 1 | 120 | ≥ 100 → true | 1 |
| 2 | 80  | ≥ 100 → false| 1 |
| 3 | 150 | ≥ 100 → true | 2 |
| 4 | 90  | ≥ 100 → false| 2 |

## Complexity Analysis
- **Time:** O(n) where n is the number of users.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you handle a stream of purchase amounts arriving in real time?
2. What if each user can have multiple purchases and you need the total per user?
3. How could you extend the solution to return the list of qualifying user IDs?

## Key Takeaway
A simple linear scan counting values that meet the threshold efficiently solves the problem.
