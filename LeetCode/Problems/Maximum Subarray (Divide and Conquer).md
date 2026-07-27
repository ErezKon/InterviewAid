# 53. Maximum Subarray — Divide and Conquer Variant

See also: [Maximum Subarray.md](Maximum%20Subarray.md) for the Kadane's algorithm solution.

This file covers the **divide and conquer** approach specifically.

**Companies:** Accenture, Accolite, Airbnb, Amazon, Apple, Arista Networks, Atlassian, Autodesk, Blinkit, Bloomberg, Bytedance, Cisco, Citadel, Cognizant, Coupang, Criteo, De Shaw, Dell, Deloitte, Epam Systems, Fractal Analytics, Goldman Sachs, Google, Hashedin, Hcl, Huawei, Ibm, Infosys, Intel, Jpmorgan, Linkedin, Medianet, Meesho, Meta, Microsoft, Nike, Nvidia, Optum, Oracle, Paypal, Persistent Systems, Phonepe, Salesforce, Samsung, Sap, Servicenow, Squarepoint Capital, Swiggy, Target, Tcs, Tech Mahindra, Tekion, Tesla, Tiktok, Turing, Uber, Upstart, Vimeo, Visa, Walmart Labs, Wells Fargo, Wix, Yandex, Zeta, Zoho, Zomato
---

## Divide and Conquer — O(n log n)

Split the array at the midpoint. The maximum subarray is either:
1. Entirely in the left half
2. Entirely in the right half
3. Crossing the midpoint

```
FUNCTION maxSubArray(nums, lo, hi):
    IF lo == hi: RETURN nums[lo]

    mid = (lo + hi) / 2
    leftMax  = maxSubArray(nums, lo, mid)
    rightMax = maxSubArray(nums, mid+1, hi)
    crossMax = maxCrossing(nums, lo, mid, hi)

    RETURN MAX(leftMax, rightMax, crossMax)

FUNCTION maxCrossing(nums, lo, mid, hi):
    // Extend left from mid
    leftSum = -∞, sum = 0
    FOR i ← mid DOWN TO lo:
        sum += nums[i]
        leftSum = MAX(leftSum, sum)

    // Extend right from mid+1
    rightSum = -∞, sum = 0
    FOR i ← mid+1 TO hi:
        sum += nums[i]
        rightSum = MAX(rightSum, sum)

    RETURN leftSum + rightSum
```

| Time | Space |
|------|-------|
| O(n log n) | O(log n) stack |

---

## Key Takeaway

> Kadane's O(n) is optimal, but the divide and conquer approach demonstrates the pattern well and is sometimes asked as a follow-up.
