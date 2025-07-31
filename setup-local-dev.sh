#!/bin/bash

# JALAI Local Development Setup Script
# This script helps set up the local development environment

echo "🚀 JALAI Local Development Setup"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if MySQL is installed
check_mysql() {
    if command -v mysql &> /dev/null; then
        print_status "MySQL is installed"
        mysql --version
        return 0
    else
        print_error "MySQL is not installed"
        return 1
    fi
}

# Check if Homebrew is installed
check_homebrew() {
    if command -v brew &> /dev/null; then
        print_status "Homebrew is installed"
        return 0
    else
        print_error "Homebrew is not installed"
        return 1
    fi
}

# Install Homebrew
install_homebrew() {
    print_info "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == "arm64" ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
}

# Install MySQL using Homebrew
install_mysql() {
    print_info "Installing MySQL..."
    brew install mysql
    print_status "MySQL installed successfully"
}

# Start MySQL service
start_mysql() {
    print_info "Starting MySQL service..."
    brew services start mysql
    print_status "MySQL service started"
}

# Create database and user
setup_database() {
    print_info "Setting up database..."
    
    # Wait for MySQL to be ready
    sleep 5
    
    # Create database
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS jalai_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        print_status "Database 'jalai_db' created successfully"
    else
        print_warning "Database might already exist or there was an issue creating it"
    fi
    
    # Show databases to verify
    print_info "Current databases:"
    mysql -u root -e "SHOW DATABASES;" 2>/dev/null
}

# Check Java installation
check_java() {
    if command -v java &> /dev/null; then
        print_status "Java is installed"
        java -version
        return 0
    else
        print_error "Java is not installed"
        return 1
    fi
}

# Check Node.js installation
check_node() {
    if command -v node &> /dev/null; then
        print_status "Node.js is installed"
        node --version
        return 0
    else
        print_error "Node.js is not installed"
        return 1
    fi
}

# Main setup process
main() {
    echo
    print_info "Checking system requirements..."
    
    # Check Java
    if ! check_java; then
        print_error "Please install Java 17 or higher first"
        print_info "You can download it from: https://adoptium.net/"
        exit 1
    fi
    
    # Check Node.js
    if ! check_node; then
        print_warning "Node.js not found. You'll need it for the frontend."
        print_info "You can download it from: https://nodejs.org/"
    fi
    
    # Check and install MySQL
    if ! check_mysql; then
        print_info "MySQL not found. Installing..."
        
        if ! check_homebrew; then
            print_info "Homebrew not found. Installing Homebrew first..."
            install_homebrew
        fi
        
        install_mysql
        start_mysql
    else
        print_info "Ensuring MySQL service is running..."
        brew services start mysql 2>/dev/null || print_warning "Could not start MySQL service (might already be running)"
    fi
    
    # Setup database
    setup_database
    
    echo
    print_status "Setup completed!"
    echo
    print_info "Next steps:"
    echo "1. Navigate to backend directory: cd backend/jalai-backend"
    echo "2. Start the backend server: ./mvnw spring-boot:run"
    echo "3. In another terminal, navigate to frontend: cd frontend/JALAI-Ecommerce/donation-Platform"
    echo "4. Install dependencies: npm install"
    echo "5. Start the frontend: npm start"
    echo
    print_info "The backend will be available at: http://localhost:8080"
    print_info "The frontend will be available at: http://localhost:3000"
    echo
    print_warning "If you encounter any issues, check the README files in the respective directories"
}

# Run main function
main
