# try:
#     with open("note.tex",'a') as f:
#      print(f.write("\"barvo"))
# except FileExistsError:
#    print("file not found")


# try:
#       amount = int(input("Amount: "))
#       result = 1000 / amount
# except ValueError:
#     print("Please enter a number")
# except ZeroDivisionError:
#       print("Amount can't be zero")
# finally:
#     print("done")


import os


input_file = "transactions.tex"
output_file = "report.tex"


customer_spend = {}


try:

    with open(input_file, "r") as file:
        for line in file:
            # Strip whitespace and skip empty lines
            line = line.strip()
            if not line:
                continue
            
            # Split line by comma (name, amount)
            try:
                name, amount_str = line.split(",")
                amount = float(amount_str)
                
                # Step 2: Build the dict mapping customer to total spend
                if name in customer_spend:
                    customer_spend[name] += amount
                else:
                    customer_spend[name] = amount
            except ValueError:
                print(f"Skipping malformed line: {line}")

    # Step 3: Sort each customer and total, highest first
    # sorted() returns a list of tuples: [('Customer', total), ...]
    sorted_spend = sorted(customer_spend.items(), key=lambda item: item[1], reverse=True)

    # Print to console
    print(f"{'Customer':<15} {'Total Spend':<10}")
    print("-" * 26)
    for name, total in sorted_spend:
        print(f"{name:<15} {total:<10.2f}")

    # Step 5: Write the summary to report.txt
    with open(output_file, "w") as out_file:
        out_file.write(f"{'Customer':<15} {'Total Spend':<10}\n")
        out_file.write("-" * 26 + "\n")
        for name, total in sorted_spend:
            out_file.write(f"{name:<15} {total:<10.2f}\n")
            
    print(f"\nSummary successfully written to '{output_file}'!")

except FileNotFoundError:
    print(f"Error: The file '{input_file}' was not found. Please ensure it exists in the current directory.")