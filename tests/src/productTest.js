import { Product, Clothing, Appliance } from '../../data/products.js';

describe('Test Suite: Product class', () => {
  let product;

  beforeEach(() => {
    product = new Product({
      id: 'test-product-id',
      image: 'images/test.jpg',
      name: 'Test Product',
      rating: { stars: 4.5, count: 10 },
      priceCents: 2599,
      keywords: ['test']
    });
  });

  it('creates a Product object with correct properties', () => {
    expect(product.id).toEqual('test-product-id');
    expect(product.name).toEqual('Test Product');
    expect(product.priceCents).toEqual(2599);
  });

  it('formats price correctly', () => {
    expect(product.getPrice()).toEqual('25.99');
  });

  it('extraInfoHTML returns empty string', () => {
    expect(product.extraInfoHTML()).toEqual('');
  });
});


// --------------------------------------------------

describe('Test Suite: Clothing class', () => {
  let clothing;

  beforeEach(() => {
    clothing = new Clothing({
      id: 'clothing-id',
      image: 'images/clothing.jpg',
      name: 'T-Shirt',
      rating: { stars: 4, count: 20 },
      priceCents: 1999,
      sizeChartLink: 'images/size-chart.png',
      keywords: ['clothing']
    });
  });

  it('creates a Clothing object', () => {
    expect(clothing instanceof Clothing).toBeTrue();
    expect(clothing.name).toEqual('T-Shirt');
  });

  it('includes size chart in extraInfoHTML', () => {
    expect(clothing.extraInfoHTML()).toMatch(/size chart/i);
    expect(clothing.extraInfoHTML()).toContain('images/size-chart.png');
  });
});


// --------------------------------------------------

describe('Test Suite: Appliance class', () => {
  let appliance;

  beforeEach(() => {
    appliance = new Appliance({
      id: 'appliance-id',
      image: 'images/appliance.jpg',
      name: 'Microwave',
      rating: { stars: 5, count: 5 },
      priceCents: 8999,
      instructionsLink: 'images/instructions.pdf',
  
      keywords: ['appliances']
    });
  });

  it('creates an Appliance object', () => {
    expect(appliance instanceof Appliance).toBeTrue();
    expect(appliance.name).toEqual('Microwave');
  });

  it('includes warranty info in extraInfoHTML', () => {
    expect(appliance.extraInfoHTML()).toContain('Warranty');
    
  });

  it('includes instructions link in extraInfoHTML', () => {
    expect(appliance.extraInfoHTML()).toContain('instructions');
  });
});

