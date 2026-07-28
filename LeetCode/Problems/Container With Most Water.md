
# 11. Container With Most Water

**Difficulty:** 🟡 Medium
**Acceptance:** 60.0%
**LeetCode:** [https://leetcode.com/problems/container-with-most-water](https://leetcode.com/problems/container-with-most-water)
**Companies:** Accenture, Accolite, Adobe, Airtel, Amazon, Apple, Bloomberg, C3 Ai, Capgemini, Capital One, Careem, Coveo, De Shaw, Deloitte, Dream11, Expedia, Flipkart, Freshworks, Goldman Sachs, Google, Groww, Hashedin, Huawei, Ibm, Infosys, Intel, Mastercard, Meta, Microsoft, Myntra, Nvidia, Okta, Oracle, Paypal, Paytm, Pornhub, Pubmatic, Qualcomm, Razorpay, Salesforce, Sap, Servicenow, Snowflake, Tableau, Tcs, Tekion, Tesla, Tiktok, Uber, Visa, Walmart Labs, Wix, Workday, Yandex, Zoho, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Visual Example](#2-visual-example)
3. [Approach 1: Brute Force — O(n²)](#3-approach-1-brute-force--on²)
4. [Approach 2: Two Pointers — O(n) ✅](#4-approach-2-two-pointers--on-)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Why Moving the Shorter Line Is Correct](#7-why-moving-the-shorter-line-is-correct)
8. [Complexity Analysis](#8-complexity-analysis)
9. [Follow-Up Questions](#9-follow-up-questions)

---

## 1. Problem Description

Given `n` non-negative integers `height[0..n-1]` where each represents a point at coordinate `(i, height[i])`, find two lines that together with the x-axis form a container that holds the **most water**.

Return the maximum amount of water the container can store.

---

## 2. Visual Example

```
Input: height = [1,8,6,2,5,4,8,3,7]

  8 |   █           █
  7 |   █     ░ ░ ░ █ ░ █
  6 |   █ █   ░ ░ ░ █ ░ █
  5 |   █ █ ░ █ ░ ░ █ ░ █
  4 |   █ █ ░ █ █ ░ █ ░ █
  3 |   █ █ ░ █ █ ░ █ █ █
  2 |   █ █ █ █ █ ░ █ █ █
  1 | █ █ █ █ █ █ █ █ █
  0 |___________________
      0 1 2 3 4 5 6 7 8

Best container: lines at index 1 (height 8) and index 8 (height 7)
Width = 8 - 1 = 7, Height = min(8, 7) = 7
Area = 7 × 7 = 49

Output: 49
```

---

## 3. Approach 1: Brute Force — O(n²)

```
FUNCTION maxAreaBrute(height):
    maxArea = 0
    FOR i ← 0 TO n - 2:
        FOR j ← i + 1 TO n - 1:
            area = MIN(height[i], height[j]) * (j - i)
            maxArea = MAX(maxArea, area)
    RETURN maxArea
```

---

## 4. Approach 2: Two Pointers — O(n) ✅

Start with the widest container (left and right ends). Greedily move the **shorter** line inward.

```
FUNCTION maxArea(height):
    left  = 0
    right = n - 1
    maxArea = 0

    WHILE left < right:
        width = right - left
        h     = MIN(height[left], height[right])
        area  = width * h
        maxArea = MAX(maxArea, area)

        IF height[left] < height[right]:
            left += 1
        ELSE:
            right -= 1

    RETURN maxArea
```

---

## 5. Examples

**Example 1:**
```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The max area is formed by the lines at indices 1 and 8.
```

**Example 2:**
```
Input: height = [4,3,2,1,4]
Output: 16
Explanation: Choose the first and last lines (both height 4) with width 4 → area 4*4=16.
```

---

## 6. Walkthrough

```
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]

left=0, right=8: h=min(1,7)=1, w=8, area=8     maxArea=8
  height[0]=1 < height[8]=7 → left=1

left=1, right=8: h=min(8,7)=7, w=7, area=49    maxArea=49  ★
  height[1]=8 > height[8]=7 → right=7

left=1, right=7: h=min(8,3)=3, w=6, area=18    maxArea=49
  height[7]=3 < height[1]=8 → right=6

left=1, right=6: h=min(8,8)=8, w=5, area=40    maxArea=49
  equal → right=5

left=1, right=5: h=min(8,4)=4, w=4, area=16    maxArea=49
  height[5]=4 < height[1]=8 → right=4

left=1, right=4: h=min(8,5)=5, w=3, area=15    maxArea=49
  height[4]=5 < height[1]=8 → right=3

left=1, right=3: h=min(8,2)=2, w=2, area=4     maxArea=49
  height[3]=2 < height[1]=8 → right=2

left=1, right=2: h=min(8,6)=6, w=1, area=6     maxArea=49
  height[2]=6 < height[1]=8 → right=1

left == right → DONE

Result: 49 ✅
```

---

## 7. Why Moving the Shorter Line Is Correct

**Proof by contradiction:**

The area is limited by the shorter line: `area = min(h[left], h[right]) × width`.

If `h[left] < h[right]`:
- Moving `right` inward **decreases width** and the height can't exceed `h[left]` (since `h[left]` is already the bottleneck). So area can only decrease or stay the same.
- Moving `left` inward **decreases width** but **might find a taller line**, potentially increasing the minimum. The area might increase.

Therefore, moving the shorter side is the only move that has a **chance** of improving the result.

---

## 8. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n²) | O(1) |
| **Two Pointers** | **O(n)** | **O(1)** |

---

## 9. Follow-Up Questions

### 9.1 How does this differ from Trapping Rain Water (#42)?

| Aspect | Container With Most Water | Trapping Rain Water |
|--------|--------------------------|---------------------|
| **What** | Max area between **two** lines | Total water trapped between **all** bars |
| **Container** | Two walls, nothing in between | Multiple walls forming valleys |
| **Goal** | Maximize a single rectangle | Sum of water columns |

### 9.2 What if the lines can have width?

Then the area calculation changes — the containers could overlap with the bars. The problem becomes more complex and depends on exact bar widths.

### 9.3 What if we need the top-k largest containers?

Maintain a **max-heap** of size k during the two-pointer sweep. After each area calculation, push to the heap. The two-pointer still guarantees we consider all potential maximums.

---

## Key Takeaway

> Two pointers converging from both ends is a powerful pattern for optimization problems over arrays. The key insight is proving that **moving the shorter line is always safe** — it's the only direction that can potentially improve the area. This greedy choice is what allows O(n) time.
