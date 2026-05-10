import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Heart, 
  Search, 
  ChevronRight, 
  Star, 
  Minus, 
  Plus, 
  Trash2,
  TrendingUp
} from 'lucide-react';
import './App.css';

// --- 목업 데이터 ---
const PRODUCTS = [
  {
    id: 1,
    name: '에어로 스피드 프로 3',
    category: '신발',
    price: 239000,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    badge: '신상품',
  },
  {
    id: 2,
    name: '클라우드 쿠션 트레이너',
    category: '신발',
    price: 159000,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800',
    badge: '베스트',
  },
  {
    id: 3,
    name: '초경량 통기성 러닝 티셔츠',
    category: '의류',
    price: 45000,
    rating: 4.5,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    name: '엘리트 컴프레션 쇼츠',
    category: '의류',
    price: 59000,
    rating: 4.7,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1602135918313-aff25ed7dc98?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    name: '프로 하이드레이션 벨트',
    category: '액세서리',
    price: 38000,
    rating: 4.4,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    name: '퍼포먼스 러닝 캡',
    category: '액세서리',
    price: 29000,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
    badge: '재입고',
  },
];

const CATEGORIES = ['전체', '신발', '의류', '액세서리'];

export default function App() {
  // --- 상태 관리 ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 장바구니 기능 ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const cartTotalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // --- 필터링된 상품 ---
  const filteredProducts = activeCategory === '전체'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  // --- 유틸리티 함수 ---
  const formatPrice = (price) => price.toLocaleString('ko-KR') + '원';

  return (
    <div className="app-container">

      {/* 헤더 및 내비게이션 */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            
            {/* 로고 & 모바일 메뉴 토글 */}
            <div className="logo-area">
              <button 
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu size={24} />
              </button>
              <a href="#" className="logo-link">
                <div className="logo-icon">
                  <TrendingUp size={24} className="transform -rotate-45" />
                </div>
                <span className="logo-text">
                  Runners<span className="text-blue">Gear</span>
                </span>
              </a>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="nav-desktop">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`nav-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            {/* 우측 아이콘 */}
            <div className="header-actions">
              <button className="icon-btn icon-btn-search">
                <Search size={20} />
              </button>
              <button className="icon-btn">
                <Heart size={20} />
              </button>
              <button 
                className="icon-btn"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={20} />
                {cartTotalItems > 0 && (
                  <span className="cart-badge">
                    {cartTotalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-panel">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setIsMobileMenuOpen(false);
              }}
              className={`mobile-nav-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <main className="container main-content">
        
        {/* 히어로 배너 */}
        {activeCategory === '전체' && (
          <div className="hero-banner">
            <img 
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1600" 
              alt="러닝하는 사람" 
              className="hero-image"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=1600'; }}
            />
            <div className="hero-text-area">
              <span className="hero-badge">Spring Collection</span>
              <h1 className="hero-title">당신의 최고 기록을<br />위한 준비</h1>
              <p className="hero-desc">엘리트 러너를 위한 최상급 러닝화부터 쾌적한 런닝을 위한 경량 의류까지 모두 만나보세요.</p>
              <button className="hero-btn">
                지금 쇼핑하기 <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* 카테고리 타이틀 */}
        <div className="section-header">
          <div className="section-title-wrap">
            <h2>{activeCategory === '전체' ? '베스트 셀러' : `${activeCategory} 컬렉션`}</h2>
            <p>총 {filteredProducts.length}개의 상품</p>
          </div>
          <div className="sort-controls">
            <select className="sort-select">
              <option>인기순</option>
              <option>신상품순</option>
              <option>낮은 가격순</option>
              <option>높은 가격순</option>
            </select>
          </div>
        </div>

        {/* 상품 그리드 */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {/* 이미지 컨테이너 */}
              <div className="product-image-wrap">
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
                <button className="like-btn">
                  <Heart size={18} />
                </button>
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => { e.target.src = 'https://placehold.co/800x800/f3f4f6/9ca3af?text=No+Image'; }}
                  className="product-image"
                />
              </div>
              
              {/* 상품 정보 */}
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating-wrap">
                  <Star size={14} className="star-icon" />
                  <span className="rating-val">{product.rating}</span>
                  <span className="review-count">({product.reviews})</span>
                </div>
                <div className="product-bottom">
                  <span className="product-price">{formatPrice(product.price)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="add-to-cart"
                    aria-label="장바구니에 담기"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col-main">
            <span className="footer-logo">
              <div className="logo-icon" style={{ padding: '0.25rem' }}>
                <TrendingUp size={20} className="transform -rotate-45" />
              </div>
              Runners<span className="text-blue">Gear</span>
            </span>
            <p className="footer-desc">
              러너들을 위한 최고의 퍼포먼스 기어를 제공합니다. 어떤 환경에서도 당신의 목표를 달성할 수 있도록 지원합니다.
            </p>
          </div>
          <div>
            <h4 className="footer-title">고객 센터</h4>
            <ul className="footer-links">
              <li><a href="#">공지사항</a></li>
              <li><a href="#">배송/반품 안내</a></li>
              <li><a href="#">1:1 문의하기</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">법적 고지</h4>
            <ul className="footer-links">
              <li><a href="#">이용약관</a></li>
              <li><a href="#">개인정보처리방침</a></li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          © 2026 RunnersGear. All rights reserved. (Demo)
        </div>
      </footer>

      {/* 장바구니 슬라이드 오버 */}
      {isCartOpen && (
        <div className="cart-overlay">
          {/* 백그라운드 오버레이 */}
          <div 
            className="cart-backdrop"
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* 장바구니 패널 */}
          <div className="cart-panel">
            {/* 장바구니 헤더 */}
            <div className="cart-header">
              <h2 className="cart-title">
                <ShoppingCart size={20} />
                장바구니 <span className="cart-count">{cartTotalItems}</span>
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="cart-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            {/* 장바구니 아이템 목록 */}
            <div className="cart-body">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingCart size={48} className="cart-empty-icon" />
                  <p>장바구니가 비어있습니다.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="cart-continue-btn"
                  >
                    쇼핑 계속하기
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      onError={(e) => { e.target.src = 'https://placehold.co/200x200/f3f4f6/9ca3af?text=No+Image'; }}
                      className="cart-item-img"
                    />
                    <div className="cart-item-info">
                      <div className="cart-item-header">
                        <div>
                          <p className="cart-item-cat">{item.category}</p>
                          <h3 className="cart-item-title">{item.name}</h3>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="cart-item-remove"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="cart-item-bottom">
                        <span className="cart-item-price">{formatPrice(item.price)}</span>
                        
                        {/* 수량 조절 */}
                        <div className="cart-qty-wrap">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="cart-qty-btn"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="cart-qty-val">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="cart-qty-btn"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 장바구니 하단 결제 정보 */}
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary-row">
                  <span>상품 금액</span>
                  <span>{formatPrice(cartTotalAmount)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>배송비</span>
                  <span>{cartTotalAmount >= 50000 ? '무료' : '3,000원'}</span>
                </div>
                {cartTotalAmount > 0 && cartTotalAmount < 50000 && (
                  <p className="cart-free-shipping-msg">
                    {formatPrice(50000 - cartTotalAmount)} 추가 주문 시 무료배송
                  </p>
                )}
                <div className="cart-total-row">
                  <span>총 결제금액</span>
                  <span>{formatPrice(cartTotalAmount + (cartTotalAmount >= 50000 || cartTotalAmount === 0 ? 0 : 3000))}</span>
                </div>
                <button className="cart-checkout-btn">
                  주문하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}